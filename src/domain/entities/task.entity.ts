import { TaskStatus } from "../../shared/enums/task-status.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./user.entity";

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({type: 'varchar', length: 255})
  title: string

  @Column({type: 'text', nullable: true})
  description: string

  @Column({type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING})
  status: TaskStatus

  @Column({type: 'timestamp', nullable: true})
  dueDate: Date

  @Column({name: 'user_id', type: 'int', nullable: true})
  userId: number

  @ManyToOne(() => User, (user) => user.tasks,{
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({name: 'user_id', referencedColumnName: 'identifyNumber'})
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ default: false })
  isDeleted: boolean
}