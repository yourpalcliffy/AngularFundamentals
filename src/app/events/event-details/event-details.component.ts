import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  IEvent,
  EventService,
  ISession
} from '../shared/index';
import { allSettled } from 'q';

@Component({
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  addMode: boolean;
  event: IEvent;
  filterBy = 'all';
  sortBy = 'name';
  constructor(private _eventService: EventService, private _route: ActivatedRoute) { }

  ngOnInit() {
    // this._route.params.forEach((params: Params) => {
      // this._eventService.getEvent(+params['id']).subscribe((val: IEvent) => {
      //     this.event = val;
      //     this.addMode = false;
      // });
      // this.event = this._route.snapshot.data['event'];
    // });
    // this.event = this._eventService.getEvent(+this._route.snapshot.params['id']);

    this._route.data.forEach((data) => {
      this.event = data['event'];
    });
  }

  addSession() {
    this.addMode = true;
  }
  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    // this._eventService.updateEvent(this.event);
    this._eventService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }
  cancelAddSession() {
    this.addMode = false;
  }
}
