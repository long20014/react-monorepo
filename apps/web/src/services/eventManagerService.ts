import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { filter, share } from 'rxjs/operators';

export type EventType =
  { name: string, data: unknown };

export class EventManagerService {
  private observable: Observable<any>;
  private observer: Observer<any>;

  constructor() {
    this.observable = new Observable((observer: Observer<any>) => {
      this.observer = observer;
    }).pipe(share());
    this.observer = new Subject();
  }

  /**
   * Method to broadcast the event to observer
   */
  public broadcast(event: any) {
    if (this.observer !== null) {
      this.observer.next(event);
    }
  }

  /**
   * Method to subscribe to an event with callback
   */
  public subscribe(eventName: string, callback: (event: EventType) => void) {
    const subscriber: Subscription = this.observable
      .pipe(
        filter((event: EventType) => {
          return event.name === eventName;
        })
      )
      .subscribe(callback);
    return subscriber;
  }

  /**
   * Method to unsubscribe the subscription
   */
  public destroy(subscriber: Subscription) {
    subscriber.unsubscribe();
  }
}

const eventManagerService = new EventManagerService();

export default eventManagerService;