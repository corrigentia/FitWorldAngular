import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MartialArt } from 'src/app/interfaces/martial-art';
import { MartialArtService } from '../services/martial-art.service';

@Injectable({
  providedIn: 'root',
})
export class MartialArtResolver  {
  constructor(private readonly martialArtService: MartialArtService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<MartialArt> {
    const id = parseInt(route.paramMap.get('id')!, 10);

    // console.log('Called get MartialArt in resolver...', route)
    console.log(`Called get MartialArt id=${id} in resolver...`, route);
    // console.log(route.data)

    return this.martialArtService.getEntity(
      parseInt(route.paramMap.get('id')!, 10)
    );
  }
}
