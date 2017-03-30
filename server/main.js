import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('allPosts', function () {
    return Posts.find({"createdBy":this.userId});
});

Meteor.publish('userPosts', function () {
    return Posts.find();
});

Meteor.publish('tvshows', function() {
    return TvShows.find();
});

Meteor.publish('movies', function() {
    return Movies.find();
});

Meteor.publish('data', function() {
    return Data.find();
});

Meteor.publish("users", function() {
    return Meteor.users.find();
});

Meteor.methods({
	sendEmail: function (to, from, subject, text){
		check([to, from, subject, text], [String]);
		
		this.unblock();
		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text
		});
	}
});

Meteor.methods({
    'myFunction' : function(input) {
        
        var query = input.value;
        var data = TvShows.findOne({name : "Barney"});
        console.log(data);
    }
});

Meteor.methods({
    'insertPost' : function(post) {
        Posts.insert (
            {
                post:post,
                date: new Date(),
                movie: this.movieId,
                createdBy: this.userId,
                likes:{
                    totalLikes: 0,
                    users:[]
                },
                retweets:{
                    totalRetweets: 0,
                    users:[]
                }
            },
            function(error, result) {
                if(error) console.log (error); //info about error
                if(result) console.log (result); // id of new obj
            }
        );
    }
});

Meteor.methods({
    'insertRating' : function(ratings) {
        Ratings.insert (
            {
                ratings:ratings,
                movie: this.movieId,
                createdBy: this.userId,
            }
        );
    }
});
