<script lang="ts">
  import { goto } from '$app/navigation';
  import Loader from '$lib/components/loader.svelte';
  import FullCalendar from 'svelte-fullcalendar';
  import type CalendarOptions from 'svelte-fullcalendar';
  import deLocale from '@fullcalendar/core/locales/de';
  import daygridPlugin from '@fullcalendar/daygrid';
  import markdownit from 'markdown-it';

  export let data: any;

  let eventTitle;
  let eventDetails;
  let eventUid;
  let eventStart;
  let eventSpecialWishes;
  let eventRemarks;
  let eventPlace;
  let eventOfferingCreated;
  let eventNumberOfPersons;
  let eventMenuePdf;
  let eventFlow;
  let eventEnd;
  let eventDate;
  let eventCreatedAt;
  let eventClient;
  let eventCateringType;
  let eventCateringStyle;
  let eventAdditionalServices;

  let currentEvents: any[] = [];
  let myModal: HTMLDialogElement;

  const md = markdownit();

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
      numberOfPersons: currentEvent.numberOfPersons + ' Persons',
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
    timeGrid: {
      dayMaxEventRows: 2
    },
    eventClick: function (info: any) {
      const dateFormattingOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };

      eventTitle = info.event.title + ' am ' + info.event.start.toLocaleDateString('de-DE', dateFormattingOptions);
      eventDetails = md.render(info.event.extendedProps.description as string);
      eventUid = info.event.extendedProps.uid;
      eventStart = info.event.start.toLocaleDateString('de-DE', dateFormattingOptions);
      eventSpecialWishes = info.event.extendedProps.specialWishes;
      eventRemarks = info.event.extendedProps.remarks;
      eventPlace = info.event.extendedProps.place;
      eventOfferingCreated = info.event.extendedProps.offeringCreated;
      eventNumberOfPersons = info.event.extendedProps.numberOfPersons;
      eventFlow = info.event.extendedProps.flow;
      eventEnd = info.event.end.toLocaleDateString('de-DE', dateFormattingOptions);
      eventClient = info.event.extendedProps.client;
      eventCateringType = info.event.extendedProps.cateringType;
      eventCateringStyle = info.event.extendedProps.cateringStyle;
      eventAdditionalServices = info.event.extendedProps.additionalServices;

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

  <FullCalendar {options} />

  <article class="prose p-16">
    <h1>Welcome to SvelteKit</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, quod. Inventore, excepturi quis accusantium consequatur doloremque omnis quos et
      voluptatem animi, libero maiores aut est? Ipsum optio quisquam unde tenetur!
    </p>
  </article>
</div>

<dialog bind:this={myModal} class="modal">
  <div class="modal-box w-11/12 max-w-2xl">
    <form method="dialog">
      <button
        class="btn absolute top-3 right-3 btn-circle btn-ghost btn-sm"
        onclick={() => {
          myModal.close();
        }}>✕</button
      >
    </form>

    <div class="mt-10 mb-6 flex flex-col items-center text-center">
      <h1>{eventTitle}</h1>
      <p class="py-2">{@html eventDetails}</p>

      <p class="py-2">{eventUid}</p>
      <p class="py-2">{eventSpecialWishes}</p>
      <p class="py-2">{eventRemarks}</p>
      <p class="py-2">{eventPlace}</p>
      <p class="py-2">{eventOfferingCreated}</p>
      <p class="py-2">{eventNumberOfPersons}</p>
      <p class="py-2">{eventFlow}</p>
      <p class="py-2">{eventClient}</p>
      <p class="py-2">{eventCateringType}</p>
      <p class="py-2">{eventCateringStyle}</p>
      <p class="py-2">{eventAdditionalServices}</p>
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

<style lang="postcss">
  @reference '../app.css';
</style>
