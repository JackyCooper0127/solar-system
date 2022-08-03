import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CELESTIAL_BODY_TYPE, CelestialBody} from '../scene.model';
import {HAS_SYMBOL, MISSING_PICTURES, SUN} from '../data/SolarSystem.data';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-celestial-body-dialog',
  templateUrl: './celestial-body-dialog.component.html',
  styleUrls: ['./celestial-body-dialog.component.scss']
})
export class CelestialBodyDialogComponent {

  public body: CelestialBody;
  public readonly SUN = SUN;
  public readonly CELESTIAL_BODY_TYPE = CELESTIAL_BODY_TYPE;
  public readonly MISSING_PICTURES = MISSING_PICTURES;
  public readonly HAS_SYMBOL = HAS_SYMBOL;

  public get lang(): string {
    return this.translate.currentLang;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { body: CelestialBody },
    private translate: TranslateService
  ) {
    this.body = data.body;
  }

  public getImagePath(body: CelestialBody, format: 'jpg' | 'avif'): string {
    let path = 'assets/celestial_bodies/';
    if (body.type === CELESTIAL_BODY_TYPE.PLANET || body.type === CELESTIAL_BODY_TYPE.DWARF_PLANET) {
      path += body.id + '/';
    } else if (body.type === CELESTIAL_BODY_TYPE.SATELLITE) {
      path += body.orbitBody.id + '/';
    }

    return path + body.id + '_small.' + format;
  }

}
