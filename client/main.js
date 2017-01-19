import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
    this.increment = new ReactiveVar(0);
    this.decrement = new ReactiveVar(10); 
});

Template.hello.helpers({
    increment : function inc () {
        return Template.instance().increment.get();
    },
    decrement : function dec () {
        return Template.instance().decrement.get();
    },
    multipurpose : function multi () {
        return Template.instance().multipurpose.get();
    },
});

Template.hello.events({
    'click .bt1' : function (event, instance) {
        // increment the counter when button is clicked
        instance.increment.set(instance.increment.get() + 1);
    },
    
    'click .bt2' : function (event, instance) {
        // decrement the counter when button is clicked
        instance.decrement.set(instance.decrement.get() - 1);
    },
    
    'click .bt3' : function (event, instance) {
        // access the other counter when button is clicked
        instance.multipurpose.set(instance.increment.get(instance.decrement));
        
    }
});

$(document).ready(function(){
    $("[data-toggle=tooltip]").tooltip();
});
