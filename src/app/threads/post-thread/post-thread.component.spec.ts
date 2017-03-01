/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostThreadComponent } from './post-thread.component';

describe('PostThreadComponent', () => {
  let component: PostThreadComponent;
  let fixture: ComponentFixture<PostThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
