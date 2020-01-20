/*
 *  Copyright (c) 2016-2018, Leftshift One
 *   __________________
 *  [2019] Leftshift One
 *  All Rights Reserved.
 *  NOTICE:  All information contained herein is, and remains
 *  the property of Leftshift One and its suppliers,
 *  if any.  The intellectual and technical concepts contained
 *   herein are proprietary to Leftshift One
 *   and its suppliers and may be covered by Patents,
 *   patents in process, and are protected by trade secret or copyright law.
 *   Dissemination of this information or reproduction of this material
 *   is strictly forbidden unless prior written permission is obtained
 *   from Leftshift One.
 */

export default class Emitter {

    private theListeners = [{}] as { eventType: string, id: number, event: EventHandler }[];

    /**
     *  Emits an event of the given type with the given data. All callbacks that are listening to the particular
     *  event type will be notified.
     *
     * @param eventType
     * @param args
     */
    public emit(eventType: string, ...args: any[]): void {
        this.listeners(eventType).forEach((listener: EventHandler) => listener(...args as any[]));
    }

    /**
     * Return an array of listeners that are currently registered for the given event type.
     *
     * @param eventType
     */
    public listeners(eventType: string): EventHandler[] {
        return this.theListeners.filter((value => value.eventType === eventType)).map(value => value.event) || [];
    }

    /**
     * Removes all of the registered listeners of the event type or id
     *
     * @param identifier
     */
    public removeListener(identifier: number | string): void {
        if (typeof identifier === 'string') {
            delete this.theListeners[identifier];
        } else {
            this.theListeners = this.theListeners.filter(value => value.id !== identifier);
        }
    }

    /**
     * Removes all of the registered listeners. eventType is optional, if provided only listeners for that
     * event type are removed.
     *
     * @param eventType
     */
    public removeAllListeners(eventType: string): void {
        this.theListeners = this.theListeners.filter(value => value.eventType !== eventType);
    }

    /**
     * Register a specific callback to be called on a particular event. A token is returned that can be used
     * to remove the listener.
     */
    public addListener(eventType: string, listener: (...args: any[]) => void): { id: number, remove: () => void } {
        const id = this.generateUniqueId();

        this.theListeners.push({id, eventType: eventType, event: listener});

        return {
            id,
            remove: (): void => {
                this.theListeners = this.theListeners.filter(value => value.id !== id);
            }
        };
    }

    public addOnceCallableListener(eventType: string, listener: (...args: any[]) => void): void {
        const event = this.addListener(eventType, (data: any) => {
            listener(data);
            event.remove();
        });
    }

    private generateUniqueId(): number {
        let id = Math.random();

        return this.theListeners.findIndex(value => value.id === id) === -1 ? id : this.generateUniqueId();
    }
}

type EventHandler = (...args: any[]) => void

export interface EmitterAware {
    emitter: Emitter;
}
