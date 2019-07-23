import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from './level.entity';
import { Comment } from './comment.entity';
import { Follow } from './follow.entity';
import { Joke } from './joke.entity';
import { Rate } from './rate.entity';
import { Report } from './report.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column('varchar', {
        nullable: true,
        unique: true,
        length: 50,
        name: 'username',
    })
    username: string | null;

    @Column('varchar', {
        nullable: false,
        length: 250,
        name: 'Name',
    })
    Name: string;

    @Column('varchar', {
        nullable: false,
        length: 250,
        name: 'Email',
    })
    Email: string;

    @Column('varchar', {
        nullable: false,
        length: 150,
        name: 'password',
    })
    password: string;

    @ManyToOne(() => Level, level => level.users,
        {
            nullable: true,
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    @JoinColumn()
    level: Level | null;

    @OneToMany(() => Comment, comment => comment.user,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    comments: Comment[];

    @OneToMany(() => Follow, follow => follow.userUserId,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    follows: Follow[];

    @OneToMany(() => Follow, follow => follow.userUserId2,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    follows2: Follow[];

    @OneToMany(() => Joke, joke => joke.user,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    jokes: Joke[];

    @OneToMany(() => Rate, rate => rate.user,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    rates: Rate[];

    @OneToMany(() => Report, report => report.userUser,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    reports: Report[];

}
