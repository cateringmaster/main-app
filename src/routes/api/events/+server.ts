import { client } from '$services/graphql-client';
import { gql } from 'graphql-request';

export const GET = async () => {
  try {
    const query = gql`
      query getMissions {
        missions(stage: PUBLISHED, first: 100) {
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
    const { missions } = (await client.request(query)) as any;

    return new Response(JSON.stringify(missions));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
