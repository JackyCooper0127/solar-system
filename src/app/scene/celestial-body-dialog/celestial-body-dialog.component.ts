import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CELESTIAL_BODY_TYPE, CelestialBody} from '../scene.model';

@Component({
  selector: 'app-celestial-body-dialog',
  templateUrl: './celestial-body-dialog.component.html',
  styleUrls: ['./celestial-body-dialog.component.scss']
})
export class CelestialBodyDialogComponent implements OnInit {

  public body: CelestialBody;
  public CELESTIAL_BODY_TYPE = CELESTIAL_BODY_TYPE;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { body: CelestialBody }
  ) {
    this.body = data.body;
  }

  ngOnInit(): void {
  }

}