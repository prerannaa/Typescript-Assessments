import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  constructor() {
    this.id = 0; // Initialize the property in the constructor
    this.title = ''; // Initialize the property in the constructor
    this.completed = false; // Initialize the property in the constructor
  }
}
