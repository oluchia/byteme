import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

/* Info Page helpers and events */
Template.info.events( function () {
    var rating = $('#rating').data('userrating');    
});

Template.info.events({
    'click .awesome' : function (event) {
        var rating = $(event.currentTarget).data('userrating');
        console.log(rating);
        
        Session.set('updateId', this._id);
        var updateId = this._id;
        console.log(updateId);
        
    }
})

Template.info.helpers({
    data : function () {
        return Data.find();
    },
    
    titleIs : function(title) {
        return this.title === title;
}
});

Template.info1.events( function () {
    var rating = $('#rating').data('userrating');
});

Template.info1.helpers({
    data : function () {
        return Data.find();
    },
    
    titleIs : function(title) {
        return this.title === title;
}
});

Template.info2.events( function () {
    var rating = $('#rating').data('userrating');
});

Template.info2.helpers({
    data : function () {
        return Data.find();
    },
    
    titleIs : function(title) {
        return this.title === title;
}
});


Template.info3.events( function () {
    var rating = $('#rating').data('userrating');
});

Template.info3.helpers({
    data : function () {
        return Data.find();
    },
    
    titleIs : function(title) {
        return this.title === title;
}
});


Template.info5.events( function () {
    var rating = $('#rating').data('userrating');
});

Template.info5.helpers({
    data : function () {
        return Data.find();
    },
    
    titleIs : function(title) {
        return this.title === title;
}
});

Template.info6.events( function () {
    var rating = $('#rating').data('userrating');
});

Template.info6.helpers({
    data : function () {
        return Data.find();
    },
    
    titleIs : function(title) {
        return this.title === title;
}
});


Template.info7.events( function () {
    var rating = $('#rating').data('userrating');
});

Template.info7.helpers({
    data : function () {
        return Data.find();
    },
    
    titleIs : function(title) {
        return this.title === title;
}
});

Template.info8.events( function () {
    var rating = $('#rating').data('userrating');
});

Template.info8.helpers({
    data : function () {
        return Data.find();
    },
    
    titleIs : function(title) {
        return this.title === title;
}
});


Template.info9.events( function () {
    var rating = $('#rating').data('userrating');
});

Template.info9.helpers({
    data : function () {
        return Data.find();
    },
    
    titleIs : function(title) {
        return this.title === title;
}
});

Template.info10.events( function () {
    var rating = $('#rating').data('userrating');
});

Template.info10.helpers({
    data : function () {
        return Data.find();
    },
    
    titleIs : function(title) {
        return this.title === title;
}
});

Template.info11.events( function () {
    var rating = $('#rating').data('userrating');
});

Template.info11.helpers({
    data : function () {
        return Data.find();
    },
    
    titleIs : function(title) {
        return this.title === title;
}
});

Template.info12.events( function () {
    var rating = $('#rating').data('userrating');
});

Template.info12.helpers({
    data : function () {
        return Data.find();
    },
    
    titleIs : function(title) {
        return this.title === title;
}
});
//ends



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
