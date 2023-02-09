import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialArtFormTemplateComponent } from './martial-art-form-template.component';

describe('MartialArtFormTemplateComponent', () => {
  let component: MartialArtFormTemplateComponent;
  let fixture: ComponentFixture<MartialArtFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MartialArtFormTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MartialArtFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
