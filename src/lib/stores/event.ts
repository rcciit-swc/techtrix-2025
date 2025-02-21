import { create } from 'zustand';
import { events, EventsActionsType, EventsStateType } from '../types/events';
import {
  addEvent,
  populateApprovalDashboard,
  populateCategories,
  populateEventDetails,
  populateEventDetailsByID,
  updatePopulateEvents,
  updateRegisterStatus,
} from '../actions';

type EventsStoreType = EventsStateType & EventsActionsType;
const eventState: EventsStateType = {
  eventCategories: [],
  eventsData: [],
  eventData: {},
  eventCategoriesLoading: false,
  eventsLoading: false,
  eventDetailsLoading: false,
  approvalDashboardData: [],
  approvalDashboardLoading: false,
};
export const useEvents = create<EventsStoreType>((set) => ({
  ...eventState,
  setEventsData: () => populateEventDetails(set),
  getEventByID: (id: string) => populateEventDetailsByID(set, id),
  getEventCategories: () => populateCategories(set),
  postEvent: (eventData: events) => addEvent(set, eventData),
  updateRegisterStatus: (id: string, status: boolean) =>
    updateRegisterStatus(set, id, status),
  updateEventsData: () => (id: string, data: any) =>
    updatePopulateEvents(set, id, data),
  getApprovalDashboardData: (id?: string) => populateApprovalDashboard(set, id),
  markEventAsRegistered: (eventId: string) =>
    set((state) => ({
      eventsData: state.eventsData.map((event) =>
        event.id === eventId ? { ...event, registered: true } : event
      ),
    })),
}));
