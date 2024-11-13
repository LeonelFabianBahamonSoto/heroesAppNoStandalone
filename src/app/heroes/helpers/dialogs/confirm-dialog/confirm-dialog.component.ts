import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { Hero } from "src/app/heroes/interfaces/hero.interface";

@Component({
    selector: "app-confirm-dialog",
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
    templateUrl: "./confirm-dialog.component.html",
    styleUrls: ["./confirm-dialog.component.sass"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {

    public continueButtonTitle = "Continuar";

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { title: string; text: string; continueButton: string, cancelButton: string, optionalData?: Hero }
    ) {}

    getButtonClass = (): string => {
        this.continueButtonTitle = this.data.continueButton == "deleteAction" ? 'Eliminar' : 'Continuar';
        return this.data.continueButton == "deleteAction" ? 'deleteButton' : 'continueButton';
    };

    onConfirmDialog = (): void =>{
        // console.info('onConfirmDialog');
        this.dialogRef.close(true);
    }

    onCancelDialog = (): void =>{
        // console.info('onCancelDialog');
        this.dialogRef.close(false);
    }
}