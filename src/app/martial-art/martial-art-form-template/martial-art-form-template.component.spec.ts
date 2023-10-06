import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialArtFormTemplateComponent } from './martial-art-form-template.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('MartialArtFormTemplateComponent', () => {
  let component: MartialArtFormTemplateComponent;
  let fixture: ComponentFixture<MartialArtFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MartialArtFormTemplateComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(MartialArtFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
