import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from "app/core/services/api/api.service";
import { SSHKeyEntity } from "../../shared/entity/SSHKeyEntity";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddSshKeyModalComponent } from "../add-ssh-key-modal/add-ssh-key-modal.component";
import { MdDialog, MdDialogConfig } from '@angular/material';
import { select } from '@angular-redux/store/lib/src/decorators/select';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'kubermatic-ssh-key-form-field',
  templateUrl: './ssh-key-form-field.component.html',
  styleUrls: ['./ssh-key-form-field.component.scss']
})
export class SshKeyFormFieldComponent implements OnInit, OnDestroy {

  public sshKeys: SSHKeyEntity[] = [];
  public config: MdDialogConfig = {};
  public selectedCloudProviderApiError: string;
  public sshKeyForm: FormGroup;
  private subscriptions: Subscription[] = [];

  @select(['wizard', 'sshKeyForm', 'ssh_keys']) selectedSshKeys$: Observable<string[]>;  
  public selectedSshKeys: string[] = [];

  constructor(private api: ApiService, private formBuilder: FormBuilder, public dialog: MdDialog) { }

  ngOnInit() {
    let sub = this.selectedSshKeys$.subscribe(selectedSshKeys => {
      this.selectedSshKeys = selectedSshKeys;
    });
    this.subscriptions.push(sub);

    this.sshKeyForm = this.formBuilder.group({
      ssh_keys: [this.selectedSshKeys, [<any>Validators.required]]
    });

    this.sshKeyForm.updateValueAndValidity();
  
    let sub2 = this.refreshSSHKeys();
    this.subscriptions.push(sub2);
  }

  private refreshSSHKeys(): Subscription {
    return this.api.getSSHKeys().subscribe(result => {
      this.sshKeys = result;
    });
  }

  public addSshKeyDialog(): void {
    const dialogRef = this.dialog.open(AddSshKeyModalComponent, this.config);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sshKeyForm.patchValue({ssh_keys: [...this.selectedSshKeys, result.metadata.name]});
        this.refreshSSHKeys();
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
