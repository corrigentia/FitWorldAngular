import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MartialArt } from 'src/app/interfaces/martial-art';
import { MartialArtService } from '../services/martial-art.service';

@Injectable({
  providedIn: 'root',
})
export class MartialArtsResolver  {
  constructor(private readonly martialArtService: MartialArtService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<MartialArt[]> {
    console.log('Called get Martial Arts in resolver...', route);

    return this.martialArtService.getMartialArts(0, 9999);
  }
}
