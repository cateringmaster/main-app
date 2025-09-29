import { client } from '$services/graphql-client';
import { gql } from 'graphql-request';

export const GET = async (req) => {
  const date = req.params.date;

  try {
    const query = gql`
      query getMissions($date: Date!) {
        missions(where: { datum: $date }, stage: PUBLISHED, first: 100) {
          uid
          title
          startTime
          start
          specialWishes
          slug
          remarks
          place
          offeringCreated
          numberOfPersons
          menue {
            id
            url
          }
          location {
            latitude
            longitude
          }
          id
          flow
          endTime
          end
          description
          date
          createdAt
          client
          cateringType
          cateringStyle
          additionalServices
        }
      }
    `;

    const variables = { date };
    const { missions } = (await client.request(query, variables)) as any;
    return new Response(JSON.stringify(missions));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
