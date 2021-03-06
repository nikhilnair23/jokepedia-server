import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Rate } from './rate.entity';
import { Report } from './report.entity';
import { Category } from './category.entity';

@Entity()
export class Joke {

    @PrimaryGeneratedColumn()
    jokeId: number;

    @Column('varchar', {
        nullable: false,
        length: 10000,
    })
    text: string;

    @ManyToOne(() => User, user => user.jokes,
        {
            nullable: false,
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    @JoinColumn()
    user: User;

    @OneToMany(() => Comment, comment => comment.joke,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    comments: Comment[];

    @ManyToMany(() => Category, category => category.jokes,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            cascade: true,
        })
    @JoinTable()
    categories: Category[];

    @OneToMany(() => Rate, rate => rate.joke,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    rates: Rate[];

    @OneToMany(() => Report, report => report.joke,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    reports: Report[];

    @CreateDateColumn()
    dateCreated: Date;
}
