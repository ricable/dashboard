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

import {HttpClientModule} from '@angular/common/http';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService, Auth, DatacenterService, PresetsService, ProjectService} from '../../../core/services';
import {NODE_DATA_CONFIG, NodeDataMode} from '../../../node-data/config';
import {NodeDataService} from '../../../node-data/service/service';
import {SharedModule} from '../../../shared/shared.module';
import {ClusterService} from '../../../shared/services/cluster.service';
import {ApiMockService} from '../../../testing/services/api-mock.service';
import {ProjectMockService} from '../../../testing/services/project-mock.service';
import {WizardService} from '../../service/wizard';
import {MachineNetworkStepComponent} from './component';
import {AppConfigService} from '../../../app-config.service';
import {AuthMockService} from '../../../testing/services/auth-mock.service';

const modules: any[] = [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, SharedModule, HttpClientModule];

describe('MachineNetworkStepComponent', () => {
  let fixture: ComponentFixture<MachineNetworkStepComponent>;
  let component: MachineNetworkStepComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...modules],
      declarations: [MachineNetworkStepComponent],
      providers: [
        WizardService,
        ClusterService,
        NodeDataService,
        ClusterService,
        PresetsService,
        DatacenterService,
        AppConfigService,
        {provide: ProjectService, useValue: ProjectMockService},
        {provide: ApiService, useValue: ApiMockService},
        {provide: Auth, useClass: AuthMockService},
        {provide: NODE_DATA_CONFIG, useValue: NodeDataMode.Wizard},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineNetworkStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Machine Network Step cmp', () => {
    expect(component).toBeTruthy();
  });
});
