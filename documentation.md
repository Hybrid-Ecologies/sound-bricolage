#Documentation
___


Create a new SoundUI object with your loaded array of selected sounds and default options

~~~
> sounds = [...]
> options = {...}
> mySoundUI = new SoundUI(sounds, options)
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

Bind sound to an element by id

~~~
> mySoundUI.bind("sound1","button1")
~~~