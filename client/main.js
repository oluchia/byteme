import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//Rating section
$('.rating span.star').click(function(){
    var total=$(this).parent().children().length;
    var clickedIndex=$(this).index();

/*    $('.rating span.star').removeClass('filled');
        for(var i=clickedIndex;i<total;i++){
	           $('.rating span.star').eq(i).addClass('filled');
        } */
    
    $('.rating span.star').click(function() {
       $('.rating span.star').removeClass('active');
        $(this).addClass('active');
    })
});

// Link functionality
$(function(){
		$('.nav a').filter(function(){
            return this.href==location.href}).parent().addClass('active').siblings().removeClass('active');
        
		$('.nav a').click(function(){
			$(this).parent().addClass('active').siblings().removeClass('active');	
		});
	});

Template.posts.helpers({
    charsRemaining: function () {
        return Session.get('CharactersRemaining');
    },
    posts: function () {
        return Posts.find({}, {sort: {date: -1}});
    },
    timeDiff: function(postDate) {
        var timeDiff = new Date().getTime() - postDate.getTime();
        var diffDays = Math.floor(timeDiff/(1000*3600*24));
        var diffHours = Math.floor(timeDiff/(1000*3600));
        var diffMins = Math.floor(timeDiff/(1000*60));
        var diffSecs = Math.floor(timeDiff/(1000));
        
        if(diffDays > 0)
            return ("about " + diffDays + "d ago");
        else if(diffHours > 0)
            return ("about " + diffHours + "h ago");
        else if(diffMins > 0)
            return ("about " + diffMins + "m ago");
        else
            return ("about " + diffSecs + "s ago");
    },
    checked: function(users) {
        if($.inArray(Meteor.userId(), users) > -1)
            return true;
        else
            return false;
    },
    userCreated: function(createdBy) {
        if(createdBy == Meteor.userId())
            return true;
        else
            return false;
    }
});

Template.posts.onRendered( function () {
    $("#postForm").validate();
});

Template.posts.events({
    'keyup #inputPost' : function(event) {
        // Retrieve the contents from the Textarea
        var inputText = event.target.value;
        Session.set("CharactersRemaining", (512-inputText.length) + " characters remaining");
    },

    'submit #postForm' : function(event) {
        event.preventDefault();
        var post = event.target.inputPost.value;
        // Clearing the textarea content
        event.target.reset();
        Session.set("CharactersRemaining", 512 + " characters remaining");
        Meteor.call('insertPost', post);
    },
    'click .likeBox' : function(event) {
        if(event.toElement.checked){
            Meteor.call('likePost', this._id);
        }
        else {
            Meteor.call('unlikePost', this._id);
        }
    },
    'likePost' : function(postId) {
        var update = true;
        
        Posts.update(
            {_id: postId},
            {$addToSet : {"likes.users":this.userId}}
        ), function(error, result) {
            if(error)
                {
                    update = false;
                }
            if(result)
                {
                    update = true;
                }
        };
        
        if(update) {
            Posts.update(
            {_id: postId},
            {$inc : {"likes.totalLikes":1}}
            ), function(error, result) {
                if(error) console.log(error);
                if(result) console.log(result);
            };
        }
    },
    'unlikePost' : function(postId) {
        Posts.update(
            {_id: postId},
            {$inc : {"likes.totalLikes":-1}}
            ), function(error, result) {
                if(error) console.log(error);
                if(result) console.log(result);
    };
    
        Posts.update(
            {_id: postId},
            {$pop : {"likes.users":this.userId}}
            ), function(error, result) {
                if(error) console.log(error);
                if(result) console.log(result);
     };
    },
    'deletePost' : function(postId) {
        Posts.remove(postId);
    },
    'updatePost' : function(postObj) {
        Posts.update({_id:postObj.id}, {$set: {post : postObj.post}});
    },
    'click .likeBox input' : function(event) {
        if(event.toElement.checked) {
            Meteor.call('likePost', this._id);
        }
        else {
            Meteor.call('unlikePost', this._id);
        }
    },
    'click .editBox input' : function(event) {
        if(event.toElement.checked) {
            $('#edit'+this._id).removeClass('hidden');
            $('#post'+this._id).hide();
        }
        else {
            var post = $('#edit'+this._id).val();
            Meteor.call('updatePost', {id:this._id, post:post});
            $('#edit'+this._id).addClass('hidden');
            $('#post'+this._id).show();
        }
    }
});
