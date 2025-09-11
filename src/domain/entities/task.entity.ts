import { TaskStatus } from "src/shared/enums/task-status.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 255})
  title: string;

  @Column({type: 'text', nullable: true})
  description: string;

  @Column({type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING})
  status: TaskStatus;

  @Column({type: 'timestamp', nullable: true})
  dueDate: Date;

  @Column({name: 'user_id', type: 'uuid'})
  userId: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}