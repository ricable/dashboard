// Copyright 2020 The Kubermatic Kubernetes Platform contributors.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//     http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {of} from 'rxjs';

import {NotificationService, RBACService} from '../../../core/services';
import {GoogleAnalyticsService} from '../../../google-analytics.service';
import {SharedModule} from '../../../shared/shared.module';
import {fakeDigitaloceanCluster} from '../../../testing/fake-data/cluster.fake';
import {fakeProject} from '../../../testing/fake-data/project.fake';
import {fakeSimpleBindings, fakeSimpleClusterBindings} from '../../../testing/fake-data/rbac.fake';
import {RouterStub} from '../../../testing/router-stubs';

import {RBACComponent} from './rbac.component';
import {fakeSeedDatacenter} from '../../../testing/fake-data/datacenter.fake';

const modules: any[] = [BrowserModule, BrowserAnimationsModule, SharedModule];

describe('RBACComponent', () => {
  let fixture: ComponentFixture<RBACComponent>;
  let component: RBACComponent;

  beforeEach(async(() => {
    const rbacMock = {
      deleteClusterBinding: jest.fn(),
      deleteBinding: jest.fn(),
    };
    rbacMock.deleteClusterBinding.mockReturnValue(of(null));
    rbacMock.deleteBinding.mockReturnValue(of(null));

    TestBed.configureTestingModule({
      imports: [...modules],
      declarations: [RBACComponent],
      providers: [
        {provide: RBACService, useValue: rbacMock},
        {provide: Router, useClass: RouterStub},
        MatDialog,
        GoogleAnalyticsService,
        NotificationService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RBACComponent);
    component = fixture.componentInstance;
    component.cluster = fakeDigitaloceanCluster();
    component.seed = fakeSeedDatacenter();
    component.projectID = fakeProject().id;
    component.clusterBindings = fakeSimpleClusterBindings();
    component.bindings = fakeSimpleBindings();
    fixture.detectChanges();
  });

  it('should create the rbac cmp', async(() => {
    expect(component).toBeTruthy();
  }));
});
