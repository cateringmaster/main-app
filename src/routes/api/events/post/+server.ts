import { client } from '$services/graphql-client';
import { gql } from 'graphql-request';
import type { RequestHandler } from '@sveltejs/kit';
import type { Catering } from '$interfaces/catering.interface';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const cateringData: Catering = await request.json();
    const mutation = gql`
      mutation CreateMission(
        $title: String!
        $start: Date
        $specialWishes: String
        $slug: String
        $remarks: String
        $place: String
        $offeringCreated: Boolean
        $numberOfPersons: Number
        $flow: String
        $end: Date
        $description: String
        $date: Date
        $client: String
        $cateringType: CateringType
        $cateringStyle: CateringStyle
        $additionalServices: [AdditionalServices!]
        $fileIDs: [AssetWhereUniqueInput!]
      ) {
        createMission(
          data: {
            title: $title
            start: $start
            specialWishes: $specialWishes
            slug: $slug
            remarks: $remarks
            place: $place
            offeringCreated: $offeringCreated
            numberOfPersons: $numberOfPersons
            menue { connect: $fileIDs }
            flow: $flow
            end: $tiendtle
            description: $description
            date: $date
            client: $client
            cateringType: $cateringType
            cateringStyle: $cateringStyle
            additionalService: $additionalService
          }
        ) {
            id
            title
            start
            specialWishes
            slug
            remarks:
            place
            offeringCreated
            numberOfPersons
            menue {
              id
              name
            }
            flow
            end
            description
            date
            client
            cateringType
            cateringStyle
            additionalService
        }
      }
    `;

    const variables = {
      title: cateringData.title,
      start: cateringData,
      specialWishes:cateringData,
      slug: cateringData,
      remarks: cateringData,
      place: cateringData,
      offeringCreated: cateringData,
      numberOfPersons: cateringData,
      flow: cateringData,
      end: cateringData,
      description: cateringData,
      date: cateringData,
      client: cateringData,
      cateringType: cateringData,
      cateringStyle: cateringData,
      additionalService: cateringData,
      fileIDs: cateringData.relatedFiles?.length ? cateringData.relatedFiles : null,
    };

    const response = (await client.request(mutation, variables)) as { createMission: Catering };


    return new Response(
      JSON.stringify({
        success: true,
        data: response.createMission
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error creating project:', error);

    // Spezifische Fehlerbehandlung für GraphQL-Fehler
    let errorMessage = 'Unknown error occurred';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;

      // Prüfe auf spezifische GraphQL-Fehler
      if (error.message.includes('authorization') || error.message.includes('Unauthorized')) {
        statusCode = 401;
        errorMessage = 'Authorization failed';
      } else if (error.message.includes('validation') || error.message.includes('required')) {
        statusCode = 400;
        errorMessage = 'Validation error: ' + error.message;
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
