import { Get, Controller, Res, Post, Headers, Param, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response as ServerResponse } from 'express-serve-static-core';
import { JokeService } from '../services/joke.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly jokeService: JokeService,
    ) {
    }

    @Get()
    async getUsers(@Res() res: ServerResponse) {
        const users = await this.userService.getUsers();
        res.send(users);
    }

    @Get(':userId/fetchUser')
    async getUser(@Res() res: ServerResponse,
        @Param('userId') userId: number) {
        const user = await this.userService.getUser(userId);
        res.send(user);
    }

    @Get(':userId/userjokes')
    async getUserJokes(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
    ) {
        const jokes = await this.jokeService.getJokesByUserId(userId);
        res.send(jokes);
    }

    @Get(':userId/userJokesCount')
    async getUserJokesCount(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
    ) {
        const count = await this.jokeService.getNumberOfJokesPosted(userId);
        res.send(count);
    }

    @Get(':userId/averageOfJokesPosted')
    async getAverageOfJokesPosted(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
    ) {
        const avg = await this.jokeService.getAverageOfJokesPosted(userId);
        res.send(avg);
    }

    @Get(':userId/getTopJokesPosted')
    async getTopJokesPosted(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
    ) {
        const topJokes = await this.jokeService.getTopRatedJokes(userId);
        res.send(topJokes);
    }

    @Get(':userId/getFavoriteCategories')
    async getFavoriteCategories(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
    ) {
        const topJokes = await this.jokeService.getFavoriteCategories(userId);
        res.send(topJokes);
    }

    @Get('getTenRandomJokes')
    async getTenRandomJokes(
        @Res() res: ServerResponse,
    ) {
        const jokes = await this.jokeService.getTenRandomJokes();
        res.send(jokes);
    }

    @Get('getJokesForCategory/:categoryId')
    async getJokesForCategory(
        @Res() res: ServerResponse,
        @Param('categoryId') categoryId: number,
    ) {
        const data = await this.jokeService.getJokesForCategory(categoryId);
        res.send(data);
    }

    @Get('getJokesForUsername/:username')
    async getJokesForUsername(
        @Res() res: ServerResponse,
        @Param('username') username: string,
    ) {
        const data = await this.jokeService.getJokesForUsername(username);
        res.send(data);
    }

    @Get('getCategories')
    async getCategories(
        @Res() res: ServerResponse,
    ) {
        const categories = await this.jokeService.getCategories();
        res.send(categories);
    }

    @Post(':userId/postJoke')
    async postJoke(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
        @Body('newJoke') newJoke: any) {

        const response = await this.jokeService.postJoke(newJoke, userId);
        res.send(response);
    }

    @Post('report')
    async reportJoke(
        @Res() res: ServerResponse,
        @Body('report') report: any) {
        const response = await this.jokeService.reportJoke(report);
        res.send(response);
    }

    @Post(':userId/rateJoke')
    async rateJoke(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
        @Body('newRate') newRate: any) {
        const response = await this.jokeService.rateJoke(newRate, userId);
        res.send(response);
    }

    @Get('getTopTenOfYear')
    async getTopTenOfYear(
        @Res() res: ServerResponse,
    ) {
        const jokes = await this.jokeService.getTopTenOfYear();
        res.send(jokes);
    }

    @Get('getTopTenOfMonth')
    async getTopTenOfMonth(
        @Res() res: ServerResponse,
    ) {
        const jokes = await this.jokeService.getTopTenOfMonth();
        res.send(jokes);
    }

    @Get('getTopTenOfAllTime')
    async getTopTenOfAllTime(
        @Res() res: ServerResponse,
    ) {
        const jokes = await this.jokeService.getTopTenOfAllTime();
        res.send(jokes);
    }

    @Get('searchUsersByUsername/:username')
    async searchUsersByUsername(
        @Res() res: ServerResponse,
        @Param('username') username: string
    ) {
        const users = await this.userService.searchUsersByUsername(username);
        console.log(users);
        res.send(users);
    }




    @Post('login')
    async login(
        @Res() res: ServerResponse,
        @Body('user') user: any) {
        const response = await this.userService.validateLogin(user);
        res.send(response);
    }

    @Get(':userId/getHomeFeedJokes')
    async getHomeFeedJokes(
        @Res() res: ServerResponse,
        @Param('userId') userId: number) {
        const response = await this.userService.getCustomizedJokes(userId);
        res.send(response);
    }

    @Post('register')
    async registerUser(
        @Res() res: ServerResponse,
        @Body('user') newUser: any) {
        const response = await this.userService.registerUser(newUser);
        res.send(response);
    }

    @Get(':userId/followers')
    async getFollowers(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
    ) {
        const followers = await this.userService.getFollowers(userId);
        res.send(followers);
    }

    @Get(':userId/followees')
    async getFollowees(
        @Res() res: ServerResponse,
        @Param('userId') userId: number,
    ) {
        const followees = await this.userService.getFollowees(userId);
        res.send(followees);
    }

    @Post('followUser')
    async FollowUser(
        @Res() res: ServerResponse,
        @Body('followerId') followerId: any,
        @Body('followeeId') followeeId: any,
    ) {
        const followUser = await this.userService.followUser(followerId, followeeId);
        res.send(followUser);
    }

    @Post('unfollowUser')
    async unFollowUser(
        @Res() res: ServerResponse,
        @Body('followerId') followerId: any,
        @Body('followeeId') followeeId: any,
    ) {
        const unFollowUser = await this.userService.unFollowUser(followerId, followeeId);
        res.send(unFollowUser);
    }
}
