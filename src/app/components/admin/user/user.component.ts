import { Component } from "@angular/core";
import { UserService } from "src/app/service/admin/user/user.service";
import { User } from "../../interface/user";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { MenuItem } from "primeng/api"; //api

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AdminUserComponent {
  users!: User[];
  userDialog!: boolean;
  user!: User;
  selectedUsers: User[] = [];
  submitted!: boolean;
  statuses!: any[];
  selectedUser!: User;
  error!: string;
  selectedFile!: File;
  constructor(
    private _UserService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this._UserService.getAllUser().subscribe((user) => {
      console.log(user);
      this.users = user;
    });
  }

  openNew() {
    this.user = {
      user_id: "",
      first_name: "",
      last_name: "",
      birth_date: new Date(),
      email: "",
      address: "",
      password: "",
      gender: "",
      image_url: "",
    };
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: any) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + user.first_name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this._UserService.deleteUser(user._id).subscribe({
          next: (response) => {
            this.users = response.users;
          },
          error: (err) => {
            // console.log(err);
            this.error = err.error.Message;
          },
        });
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "User Deleted",
          life: 3000,
        });
      },
      reject: () => {
        console.log("rejected");
      },
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  onFileSelected(event: any) {
    // console.log(event);
    this.selectedFile = <File>event.currentFiles[0];
  }

  saveUser() {

    this.submitted = true;

    if ((this.user.first_name + this.user.last_name).trim()) {
      if (this.user._id) {
        this.users[this.findIndexById(this.user._id)] = this.user;


        const updateData = new FormData();

        updateData.append("first_name", this.user.first_name);
        // console.log("After f name :   " + updateData.has("first_name"));
        updateData.append("last_name", this.user.last_name);
        updateData.append("email", this.user.email);
        updateData.append("gender", this.user.gender || "");
        updateData.append("address", this.user.address || "");
        if (this.selectedFile) {
          updateData.append("image_url", this.selectedFile, this.selectedFile.name);
          console.log(updateData);
        }
        // console.log(this.user.first_name);
        // console.log(this.user.last_name);
        // console.log(this.user.email);
        // console.log(this.user.gender);
        // console.log(this.user.address);
        // console.log(this.user.image_url);



        // this._UserService
        //   .updateUser(formData, this.user._id)
        //   .subscribe((user) => {
        //     console.log(user);
        //   });

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "User Updated",
          life: 3000,
        });
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {
        _id: "",
        user_id: "",
        first_name: "",
        last_name: "",
        birth_date: new Date(),
        email: "",
        address: "",
        password: "",
        gender: "",
        image_url: "",
      };
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
