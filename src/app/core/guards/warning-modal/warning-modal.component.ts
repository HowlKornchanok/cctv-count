import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warning-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warning-modal.component.html',
  styleUrl: './warning-modal.component.scss'
})
export class WarningModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  showModal = true;

  hideModal() {
    this.showModal = false;
    this.closeModal.emit();
  }
}
