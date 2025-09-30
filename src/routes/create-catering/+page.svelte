<script lang="ts">
  import { goto } from '$app/navigation';
  import { user, isAuthenticated, userroles } from '$store/sharedStates.svelte';
  import { onMount } from 'svelte';
  import { Carta, MarkdownEditor } from 'carta-md';
  import { emoji } from '@cartamd/plugin-emoji';
  import { slash } from '@cartamd/plugin-slash';
  import { code } from '@cartamd/plugin-code';
  import 'carta-md/default.css';
  import 'leaflet/dist/leaflet.css';

  let L: any; // Declare L as a variable that will hold the Leaflet object

  const carta = new Carta({
    sanitizer: false,
    extensions: [emoji(), slash(), code()]
  });
  let descriptionValue = $state('');
  let remarksValue = $state('');
  let clientValue = $state('');

  // State for form fields
  let title = $state('');
  let specialWishes = $state('');
  let slug = $derived(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim()
  );
  let remarks = $state('');
  let place = $state('');
  let offeringCreated = $state(false);
  let numberOfPersons = $state(1);
  let location = $state({
    latitude: 0,
    longitude: 0
  });
  let description = $state('');
  let dateString = $state('');
  let date = $derived(new Date(dateString));
  let client = $state('');

  let map: any; // Using any for Leaflet map instance
  let marker: any; // Using any for Leaflet marker instance
  const initialLatLng: [number, number] = [52.52, 13.405]; // Default: Berlin

  let cateringType = $state(''); // Dropdown
  let cateringStyle = $state(''); // Dropdown
  let additionalServices = $state([]); // Multi-select
  let endTime = $state('');
  let startTime = $state('');

  let end = $derived(new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(endTime.slice(0,2)), Number(endTime.slice(-2))));
  let start = $derived(new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(startTime.slice(0,2)), Number(startTime.slice(-2))));
  let uploadedFileNames = $state<string[]>([]);

  // Dummy data for dropdowns and multi-select for demonstration
  const cateringTypes = [
    { id: 'wedding', name: 'Hochzeitsfeier' },
    { id: 'party', name: 'Party' },
    { id: 'meeting', name: 'Geschäftsmeeting' },
    { id: 'businessEvent', name: 'Geschäftsveranstaltung' },
    { id: 'conference', name: 'Konferenz' },
    { id: 'other', name: 'Etwas anderes' }
  ];
  const cateringStyles = [
    { id: 'buffet', name: 'Buffet' },
    { id: 'liveCooking', name: 'Live Cooking' },
    { id: 'fingerfood', name: 'Finger Foood' },
    { id: 'veggie', name: 'Vegetarisch' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'other', name: 'Etwas anderes' }
  ];
  const allAdditionalServices = [
    { id: 'drinks', name: 'Getränke' },
    { id: 'staff', name: 'Zusätzliches Personal' },
    { id: 'dishes', name: 'Geschirr und Besteck' },
    { id: 'furniture', name: 'Möbiliar' },
    { id: 'cleaning', name: 'Reinigungsservice' },
    { id: 'other', name: 'Etwas anderes' }
  ];

  let isAuth = $derived(isAuthenticated.get());
  let currentUserRoles = $derived(userroles.get());

  onMount(async () => {
    // Dynamically import Leaflet on the client side
    const Leaflet = await import('leaflet');
    L = Leaflet.default;

    // Redirect if not authenticated or not a 'creator'
    if (!isAuth || !currentUserRoles?.includes('creator')) {
      goto('/');
    }
  });

  function leafletMap(node: HTMLElement) {
    if (typeof L === 'undefined') {
      console.warn('Leaflet is not loaded yet. Map will not initialize.');
      return {};
    }

    map = L.map(node).setView(initialLatLng, 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = L.marker(initialLatLng, { draggable: true }).addTo(map);
    marker.on('dragend', (event: any) => {
      const { lat, lng } = event.target.getLatLng();
      location.latitude = lat;
      location.longitude = lng;
    });

    map.on('click', (event: any) => {
      location.latitude = event.latlng.lat;
      location.longitude = event.latlng.lng;
      marker.setLatLng(event.latlng);
    });

    // Initial setting of location
    location.latitude = initialLatLng[0];
    location.longitude = initialLatLng[1];

    return {
      destroy() {
        map.remove();
      }
    };
  }

  async function handleSubmit() {
    // TODO: Implement form submission logic
    console.log('Form Submitted!', {
      title,
      specialWishes,
      slug,
      remarks: remarksValue, // Using remarksValue from the MarkdownEditor
      place,
      offeringCreated,
      numberOfPersons,
      location,
      description: descriptionValue, // Using descriptionValue from the MarkdownEditor
      date,
      client: clientValue, // Using clientValue from the MarkdownEditor
      cateringType,
      cateringStyle,
      additionalServices,
      end,
      start
    });
    // try {
    //   const response = await fetch('/api/create-catering', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       title,
    //       specialWishes,
    //       slug,
    //       remarks,
    //       place,
    //       offeringCreated,
    //       numberOfPersons,
    //       location,
    //       description,
    //       date,
    //       createdAt,
    //       client,
    //       cateringType,
    //       cateringStyle,
    //       additionalServices,
    //       end,
    //       start,
    //     }),
    //   });
    //   if (response.ok) {
    //     alert('Catering event created successfully!');
    //     goto('/'); // Redirect to homepage or event list
    //   } else {
    //     alert('Failed to create catering event.');
    //   }
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    //   alert('An error occurred.');
    // }
  }
</script>

<div class="spacer"></div>
<div class="container mx-auto max-w-2xl p-4">
  <h1 class="mb-6 text-center text-3xl font-bold">Neues Catering anlegen</h1>
  <form onsubmit={handleSubmit} class="space-y-4 rounded-lg bg-base-100 p-6 shadow-lg">
    <!-- Title -->
    <div>
      <label for="title" class="label">
        <span class="label-text">Titel</span>
      </label>
      <input type="text" id="title" bind:value={title} class="input-bordered input w-full" required />
      {#if slug != ''}
        <div class="text-right text-accent text-sm px-2.5">{slug}</div>
       {/if}
    </div>

    <!-- Number of Persons -->
    <div>
      <label for="numberOfPersons" class="label">
        <span class="label-text">Anzahl der Personen</span>
      </label>
      <input type="number" id="numberOfPersons" bind:value={numberOfPersons} min="1" class="input-bordered input w-full" required />
    </div>

    <!-- Date -->
    <div>
      <label for="date" class="label">
        <span class="label-text">Datum des Events</span>
      </label>
      <input type="date" id="date" bind:value={dateString} class="input-bordered input w-full" required />
    </div>

    <!-- Startzeit -->
    <div>
      <label for="start" class="label">
        <span class="label-text">Startzeit</span>
      </label>
      <input type="time" id="start" bind:value={startTime} class="input-bordered input w-full" required />
    </div>

    <!-- Endzeit -->
    <div>
      <label for="end" class="label">
        <span class="label-text">Endzeit</span>
      </label>
      <input type="time" id="end" bind:value={endTime} class="input-bordered input w-full" required />
    </div>

    <!-- Place -->
    <div>
      <label for="place" class="label">
        <span class="label-text">Ort</span>
      </label>
      <input type="text" id="place" bind:value={place} class="input-bordered input w-full" required />
    </div>


    <!-- Catering Type (Dropdown) -->
    <div>
      <label for="cateringType" class="label">
        <span class="label-text">Catering Typ</span>
      </label>
      <select id="cateringType" bind:value={cateringType} class="select-bordered select w-full" required>
        <option value="" disabled>Wähle einen Typ</option>
        {#each cateringTypes as type}
          <option value={type.id}>{type.name}</option>
        {/each}
      </select>
    </div>

    <!-- Catering Style (Dropdown) -->
    <div>
      <label for="cateringStyle" class="label">
        <span class="label-text">Catering Stil</span>
      </label>
      <select id="cateringStyle" bind:value={cateringStyle} class="select-bordered select w-full" required>
        <option value="" disabled>Wähle einen Stil</option>
        {#each cateringStyles as style}
          <option value={style.id}>{style.name}</option>
        {/each}
      </select>
    </div>

    <!-- Additional Services (Multi-select) -->
    <div>
      <label class="label">
        <span class="label-text">Zusätzliche Dienstleistungen</span>
      </label>
      <div class="grid grid-cols-2 gap-2">
        {#each allAdditionalServices as service}
          <div class="form-control">
            <label class="label cursor-pointer justify-start">
              <input type="checkbox" class="checkbox checkbox-primary" value={service.id} bind:group={additionalServices} />
              <span class="label-text ml-2">{service.name}</span>
            </label>
          </div>
        {/each}
      </div>
    </div>

    <!-- Description (Markdown Editor) -->
    <div>
      <label for="description" class="label">
        <span class="label-text">Beschreibung (Markdown)</span>
      </label>
      <MarkdownEditor bind:value={description} mode="tabs" {carta} />
    </div>

    <!-- Client (Markdown Editor) -->
    <div>
      <label for="client" class="label">
        <span class="label-text">Kunde (Markdown)</span>
      </label>
      <MarkdownEditor bind:value={client} mode="tabs" {carta} />
    </div>

    <!-- Remarks (Markdown Editor) -->
    <div>
      <label for="remarks" class="label">
        <span class="label-text">Bemerkungen (Markdown)</span>
      </label>
      <MarkdownEditor bind:value={remarks} mode="tabs" {carta} />
    </div>

    <!-- Special Wishes -->
    <div>
      <label for="specialWishes" class="label">
        <span class="label-text">Besondere Wünsche</span>
      </label>
      <textarea id="specialWishes" bind:value={specialWishes} class="textarea-bordered textarea h-24 w-full" placeholder="Gibt es besondere Wünsche?"
      ></textarea>
    </div>

    <!-- Offering Created Checkbox -->
    <div class="form-control">
      <label class="label cursor-pointer justify-start">
        <input type="checkbox" class="checkbox checkbox-primary" bind:checked={offeringCreated} />
        <span class="label-text ml-2">Angebot erstellt</span>
      </label>
    </div>

    <!-- File Upload Field -->
    <div>
      <label for="fileUpload" class="label">
        <span class="label-text">Datei hochladen</span>
      </label>
      <input
        type="file"
        id="fileUpload"
        class="file-input file-input-bordered w-full"
        multiple
        onchange={(e) => {
          const newFiles = Array.from((e.target as HTMLInputElement).files || []).map(file => file.name);
          uploadedFileNames = [...uploadedFileNames, ...newFiles];
          // Clear the input value so the same file can be selected again if needed
          (e.target as HTMLInputElement).value = '';
        }}
      />
    </div>

    <!-- Display uploaded file names -->
    {#if uploadedFileNames.length > 0}
      <div class="mt-2">
        <span class="label-text">Hochgeladene Dateien:</span>
        <ul class="list-disc list-inside">
          {#each uploadedFileNames as fileName, index}
            <li class="flex items-center justify-between text-sm text-gray-700">
              {fileName}
              <button type="button" class="btn btn-ghost btn-xs" onclick={() => {
                uploadedFileNames.splice(index, 1);
                uploadedFileNames = uploadedFileNames; // Trigger reactivity
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <button type="submit" class="btn w-full btn-secondary">Catering erstellen</button>
  </form>
</div>
<div class="spacer"></div>

<style lang="postcss">
  @reference '../../app.css';
  label {
    @apply my-2 font-semibold;
  }

  :global(.carta-editor textarea) {
    min-height: 200px !important; /* eigene Wunschhöhe */
    max-height: 400px; /* optional */
    height: auto; /* sorgt für flexiblere Anpassung */
  }

  :global(.carta-editor) {
    min-height: 0 !important; /* Default aufheben */
    height: auto !important; /* dynamisch */
    max-height: 285px !important; /* dein Limit */
    @apply !border-2 !border-base-content/20 !rounded-lg;
  }
  :global(.carta-toolbar) {
    @apply !border-b-2 !border-base-content/20;
  }
  :global(.carta-wrapper) {
    min-height: 0 !important; /* Default aufheben */
    height: auto !important; /* dynamisch */
    max-height: 250px !important; /* dein Limit */
  }
  :global(.carta-container) {
    min-height: 0 !important; /* Default aufheben */
    height: auto !important; /* dynamisch */
    max-height: 250px !important; /* dein Limit */
  }
  :global(.carta-input) {
    min-height: 0 !important; /* Default aufheben */
    height: auto !important; /* dynamisch */
    max-height: 250px !important; /* dein Limit */
  }
  :global(.carta-input-wrapper) {
    min-height: 0 !important; /* Default aufheben */
    height: auto !important; /* dynamisch */
    max-height: 250px !important; /* dein Limit */
  }
</style>
