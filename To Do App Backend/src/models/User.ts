import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  constructor() {
    this.id = 0; // Initialize the property in the constructor
    this.username = ''; // Initialize the property in the constructor
    this.password = ''; // Initialize the property in the constructor
  }
}
