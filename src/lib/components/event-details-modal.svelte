<script lang="ts">
  import markdownit from 'markdown-it';

  export let myModal: HTMLDialogElement;
  export let eventTitle: string;
  export let eventDetails: string;
  export let eventUid: string;
  export let eventSpecialWishes: string;
  export let eventRemarks: string;
  export let eventPlace: string;
  export let eventOfferingCreated: boolean;
  export let eventNumberOfPersons: string;
  export let eventFlow: string;
  export let eventClient: string;
  export let eventCateringType: string;
  export let eventCateringStyle: string;
  export let eventAdditionalServices: string;

  const md = markdownit();
</script>

<dialog bind:this={myModal} class="modal">
  <div class="modal-box w-full h-full rounded-none md:rounded-2xl md:h-auto max-w-2xl">
    <form method="dialog">
      <button
        class="absolute right-3 top-3 btn btn-sm btn-circle btn-ghost"
        onclick={() => {
          myModal.close();
        }}>✕</button
      >
    </form>

    <div class="prose max-w-none mb-6 mt-10 flex flex-col">
      <h2 class="text-2xl font-bold">{eventTitle}</h2>
      <div class="divider"></div>

      {#if eventDetails}
        <p class="text-base">{@html md.render(eventDetails)}</p>
      {/if}

      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <tbody>
            {#if eventPlace}
              <tr>
                <th>Ort:</th>
                <td>{eventPlace}</td>
              </tr>
            {/if}
            {#if eventNumberOfPersons}
              <tr>
                <th>Personen:</th>
                <td>{eventNumberOfPersons}</td>
              </tr>
            {/if}
            {#if eventCateringType}
              <tr>
                <th>Catering-Typ:</th>
                <td>{eventCateringType}</td>
              </tr>
            {/if}
            {#if eventCateringStyle}
              <tr>
                <th>Catering-Stil:</th>
                <td>{eventCateringStyle}</td>
              </tr>
            {/if}
            {#if eventClient}
              <tr>
                <th>Kunden Infos:</th>
                <td>{eventClient}</td>
              </tr>
            {/if}
            
            {#if eventFlow}
              <tr>
                <th>Ablauf:</th>
                <td>{eventFlow}</td>
              </tr>
            {/if}
            {#if eventSpecialWishes}
              <tr>
                <th>Besondere Wünsche:</th>
                <td>{eventSpecialWishes}</td>
              </tr>
            {/if}
            {#if eventAdditionalServices}
              <tr>
                <th>Zusatzleistungen:</th>
                <td>{eventAdditionalServices}</td>
              </tr>
            {/if}
            {#if eventRemarks}
              <tr>
                <th>Bemerkungen:</th>
                <td>{eventRemarks}</td>
              </tr>
            {/if}
            {#if eventOfferingCreated}
              <tr>
                <th>Angebot erstellt:</th>
                <td><input type="checkbox" class="toggle toggle-primary" checked disabled /></td>
              </tr>
            {/if}
            {#if eventUid}
              <tr>
                <th>UID:</th>
                <td>{eventUid}</td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button
      onclick={() => {
        myModal.close();
      }}>close</button
    >
  </form>
</dialog>
