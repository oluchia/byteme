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

//Comments section
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
});
