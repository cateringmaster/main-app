<script lang="ts">
  import { goto } from '$app/navigation';
  import Loader from '$lib/components/loader.svelte';
  import FullCalendar from 'svelte-fullcalendar';
  import type CalendarOptions from 'svelte-fullcalendar';
  import deLocale from '@fullcalendar/core/locales/de';
  import daygridPlugin from '@fullcalendar/daygrid';
  import EventDetailsModal from '$lib/components/event-details-modal.svelte';

  export let data: any;

  // Variables to pass to the modal
  let selectedEventTitle = '';
  let selectedEventDetails = '';
  let selectedEventUid = '';
  let selectedEventSpecialWishes = '';
  let selectedEventRemarks = '';
  let selectedEventPlace = '';
  let selectedEventOfferingCreated = false;
  let selectedEventNumberOfPersons = '';
  let selectedEventFlow = '';
  let selectedEventClient = '';
  let selectedEventCateringType = '';
  let selectedEventCateringStyle = '';
  let selectedEventAdditionalServices = '';

  let currentEvents: any[] = [];
  let myModal: HTMLDialogElement; // Still needed to bind to the <dialog> element in the new component

  for (let i = 0; i < data.events.length; i++) {
    const currentEvent = data.events[i];
    let tempEvent: {
      title: string;
      description?: string;
      date: string | Date;
      start?: string | Date;
      end?: string | Date;
      specialWishes?: string;
      uid?: string;
      slug?: string;
      remarks?: string;
      place?: string;
      offeringCreated?: boolean;
      numberOfPersons?: string;
      flow?: string;
      createdAt?: string | Date;
      client?: string;
      cateringType?: string;
      cateringStyle?: string;
      additionalServices?: string;
    } = {
      title: currentEvent.title,
      description: currentEvent.description,
      date: currentEvent.date,
      start: currentEvent.start,
      end: currentEvent.end,
      uid: currentEvent.uid,
      specialWishes: currentEvent.specialWishes,
      slug: currentEvent.slug ?? 'n/a',
      remarks: currentEvent.remarks ?? 'n/a',
      place: currentEvent.place ?? 'n/a',
      offeringCreated: currentEvent.offeringCreated ?? false,
      numberOfPersons: currentEvent.numberOfPersons + ' Personen',
      flow: currentEvent.flow ?? 'n/a',
      createdAt: currentEvent.createdAt,
      client: currentEvent.client ?? 'n/a',
      cateringType: currentEvent.cateringType ?? 'n/a',
      cateringStyle: currentEvent.cateringStyle ?? 'n/a',
      additionalServices: currentEvent.additionalServices ?? 'n/a'
    };
    currentEvents.push(tempEvent);
  }

  let options: CalendarOptions = {
    events: currentEvents,
    initialView: 'dayGridMonth',
    weekends: true,
    locales: [deLocale],
    locale: 'de',
    plugins: [daygridPlugin],
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    eventClick: function (info: any) {
      const dateFormattingOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };

      selectedEventTitle = info.event.title + ' am ' + info.event.start.toLocaleDateString('de-DE', dateFormattingOptions);
      selectedEventDetails = info.event.extendedProps.description as string;
      selectedEventUid = info.event.extendedProps.uid;
      selectedEventSpecialWishes = info.event.extendedProps.specialWishes;
      selectedEventRemarks = info.event.extendedProps.remarks;
      selectedEventPlace = info.event.extendedProps.place;
      selectedEventOfferingCreated = info.event.extendedProps.offeringCreated;
      selectedEventNumberOfPersons = info.event.extendedProps.numberOfPersons;
      selectedEventFlow = info.event.extendedProps.flow;
      selectedEventClient = info.event.extendedProps.client;
      selectedEventCateringType = info.event.extendedProps.cateringType;
      selectedEventCateringStyle = info.event.extendedProps.cateringStyle;
      selectedEventAdditionalServices = info.event.extendedProps.additionalServices;

      myModal.showModal();
    }
  };
</script>

<svelte:head>
  <title>Startseite</title>
  <meta name="description" content="Das ist die Startseite..." />
</svelte:head>

<div class="inner-box">
  <div class="spacer"></div>
  <div class="p-4">
    <FullCalendar {options} />
  </div>
  
  <div class="spacer"></div>
</div>

<EventDetailsModal
  bind:myModal="{myModal}"
  eventTitle="{selectedEventTitle}"
  eventDetails="{selectedEventDetails}"
  eventUid="{selectedEventUid}"
  eventSpecialWishes="{selectedEventSpecialWishes}"
  eventRemarks="{selectedEventRemarks}"
  eventPlace="{selectedEventPlace}"
  eventOfferingCreated="{selectedEventOfferingCreated}"
  eventNumberOfPersons="{selectedEventNumberOfPersons}"
  eventFlow="{selectedEventFlow}"
  eventClient="{selectedEventClient}"
  eventCateringType="{selectedEventCateringType}"
  eventCateringStyle="{selectedEventCateringStyle}"
  eventAdditionalServices="{selectedEventAdditionalServices}"
/>

<style lang="postcss">
  @reference '../app.css';
  /* The modal-box styling is now inside event-details-modal.svelte */
</style>
