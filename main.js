import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Avatar.setOptions({
  defaultImageUrl: "data:image/jpeg;base64,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"
});

Avatar.setOptions({
  fallbackType: "http://i.imgur.com/hMEEj.jpg"
});



Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0); 
 this.increment =  new ReactiveVar(0);
  this.decrement =  new ReactiveVar(10);
 
});
Template.hello.helpers({
 counter() {
   return Template.instance().counter.get();
 },

 increment : function inc(){
   return Template.instance().increment.get();
},
  decrement : function dec(){
 return Template.instance().decrement.get();
  },


});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  'click .bt1' : function(event, instance){
    instance.increment.set(instance.increment.get() + 1);
},
  'click .bt2' : function(event, instance){
   instance.decrement.set(instance.decrement.get() - 1);
},
  'click .bt3' : function(event, instance){
	  instance.increment.set(instance.increment.get() + 1);
   instance.decrement.set(instance.decrement.get() - 1);
},

});





Template.hello.onCreated(function profileOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0); 
 this.increment =  new ReactiveVar(0);
});

Template.profile.helpers({
 counter() {
   return Template.instance().counter.get();
 },

 increment : function inc(){
   return Template.instance().increment.get();
},
});


Template.profile.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


Template.data.helpers({
comments: function(){
return Comments.find();
},
});

Template.profile.helpers({
movieComment: function(){
return movieComment.find();
},
});





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

//Comments section
/*
$('#comments-container').comments({
    profilePictureURL: 'https://app.viima.com/static/media/user_profiles/user-icon.png',
    getComments: function(success, error) {
        var commentsArray = [{
            id: 1,
            created: '2015-10-01',
            content: 'Lorem ipsum dolort sit amet',
            fullname: 'Simon Powell',
            upvote_count: 2,
            user_has_upvoted: false
        }];
        success(commentsArray);
    }
});*/


//new stuff

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








