import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { DWARF_PLANETS } from 'src/app/scene/data/DwarfPlanets.data';
import {HAS_SYMBOL, INNER_PLANETS, OUTER_PLANETS, SOLAR_SYSTEM, SUN} from 'src/app/scene/data/SolarSystem.data';
import {CelestialBody, LagrangePoint} from '../../scene/scene.model';
import {SearchPanelService} from './search-panel.service';
import {GANYMEDE, JUPITER} from '../../scene/data/Jupiter.data';
import {EARTH, MOON} from '../../scene/data/Earth.data';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit, OnChanges {

  @Input() public search = '';

  public searchResult: CelestialBody[] | null = null;

  public get nbCol(): number {
    return window.innerWidth <= 600 ? 2 : 4;
  }

  public readonly SUN = SUN;
  public readonly INNER_PLANETS = INNER_PLANETS;
  public readonly OUTER_PLANETS = OUTER_PLANETS;
  public readonly DWARF_PLANETS = DWARF_PLANETS;
  public readonly EARTH = EARTH;
  public readonly JUPITER = JUPITER;
  public readonly MOON = MOON;
  public readonly GANYMEDE = GANYMEDE;
  public readonly HAS_SYMBOL = HAS_SYMBOL;
  public readonly NB_DWARF_PLANETS_SATELLITES = DWARF_PLANETS.reduce((nb, p) => nb + p.satellites.length, 0);

  private searchChanged: Subject<void> = new Subject<void>();

  constructor(
    private searchService: SearchPanelService
  ) { }

  public ngOnInit(): void {
    this.searchChanged.pipe(debounceTime(300)).subscribe(() => {
      if (this.search === '') {
        this.searchResult = null;
      } else {
        this.searchResult = this.searchService.filter(SOLAR_SYSTEM, ['id'], this.search);
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.search) {
      this.searchChanged.next();
    }
  }

  public onBodySelected(body: CelestialBody): void {
    this.searchService.onBodySelected.next(body);
  }

  public onLagrangePointSelected(point: LagrangePoint): void {
    // this.searchService.onBodySelected.next(body);
  }

}
