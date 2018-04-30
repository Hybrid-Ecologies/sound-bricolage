#Documentation
___


Create a new SoundUI object with your loaded array of selected sounds and default options, binding it to a DOM element

~~~
> sounds = [...]
> options = {...}
> mySoundUI = new SoundUI(sounds, options, elementID)
~~~

See sounds available in scope

~~~
> mySoundUI.list()
< ["sound1", "sound2", "sound3", ...] 
~~~

Play any specific sound by name

~~~
> additionalOptions = {...}
> mySoundUI.play("sound1")
~~~

Bind sound to an event on an element by id, options will override default options

~~~
> mySoundUI.bind("sound1","button1", options)
~~~

Removes all bound events from an element

~~~
>  mySoundUI.unbind("button1")
~~~

Get a list of all event bindings on an element

~~~
> mySoundUI.bindings("button1")
< [{elementID:"button1", options:{...}, sound:"sound1"}, ...]
~~~

Hide bound element

~~~
> mySoundUI.hide()
~~~

Show bound element

~~~
> mySoundUI.show()
~~~

Options, `playType` is how sound is played where `eventType` is the triggering event

~~~
> var options = {
> 	playType: "oneShotPolyphonic", 
> 		// Could be "oneShotPolyphonic", "oneShotMonophonic" ,"gate" or "loop"
> 	eventType: "hover",
> 		// Could be "hover", "click"
> }
~~~
