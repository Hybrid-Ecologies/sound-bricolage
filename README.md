# SoundBricolage
Javascript utility for prototyping sound cues to DOM elements.

## Dependencies
> TODO: Mention jQuery Easy sound effects, give link here, explain how we use it.

## Installation
> TODO: How does one incoporate this into their projects?

## API

Create a new SoundUI object with your loaded array of selected sounds and default options, binding it to a DOM element.

A SoundLib acts as a manifest for a collection of sound files. 
> TODO: Picture of interface

To facilitate prototyping, a set of buttons will be generated and appended to the `dom` element, or by default to `<body>`. For each sound file, buttons will be generated for the `playTypes` specified, and play the sound when clicked.
~~~
> var options = {
>   sounds: ["/sounds/1.wav", "/sounds/2.wav", "/sounds/3.wav"]
> 	playTypes: ["oneShotPolyphonic", "oneShotMonophonic", "gate", "loop"]
>   dom: $("#my-sounds")
> };
> sound_lib = new SoundLib(options)
~~~
Additionally, collections of sounds can be specified as follows: 
~~~
> var options = {
>   sounds: { 
      taps: ["/sounds/tap1.wav", "/sounds/tap2.wav"],
      swipes: ["/sounds/swipe1.wav"]
> }
~~~
### Triggering sounds
Play any specific sound by name

~~~
> additionalOptions = {...}
> sound_lib.play("sound1", additionalOptions)
~~~

### Utility functions
~~~
> # Hide sound prototype interface
> sound_lib.hide()
> # Show sound prototype interface
> sound_lib.show()
> # See sounds available in scope
> sound_lib.list()
< ["sound1", "sound2", "sound3", ...] 
~~~


### Binding sounds to DomElement MouseEvents
> TODO: Add a better motivating scenario. Suppose you wanted to make an expressive "Trash" button interaction that would "creak" when you hovered over it and "crash" when pressed. Alter example code to fit the scenario. Add an examples folder with the example interaction.

To bind sound to an event on a DomElement by id, options will override default options

Options, `playType` is how sound is played where `eventType` is the mouse event
> TODO: Explain playTypes.
~~~
> var bindOptions = {
> 	playType: "oneShotPolyphonic" || "oneShotMonophonic" || "gate" || "loop"
> 	eventType: "hover" || "click"
> };
> sound_lib.bind("sound1","button1", bindOptions);
~~~

Removes all bound events from an element
~~~
>  sound_lib.unbind("button1")
~~~


