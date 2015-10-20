
SpriteData.add('player_sprite', {
	file: 'images/aviao.png',
	sizeAdjustFactor: .5,
	frames: [
	    {
            x: 1,
            y: 1,
            width: 74,
            height: 89
	    }
    ],
    sequences: [
    	{
	        name: 'idle',
	        start: 1,
	        count: 1
	    }
    ]

});

SpriteData.add('baloon_sprite', {
	file: 'images/balao01.png',
	sizeAdjustFactor: .5,
	frames: [
	    {
            x: 1,
            y: 1,
            width: 128,
            height: 128
	    }
    ],
    sequences: [
    	{
	        name: 'idle',
	        start: 1,
	        count: 1
	    }
    ]

});


SpriteData.add('cloud_sprite', {
	file: 'images/nuvem01.png',
	sizeAdjustFactor: .4,
	frames: [
	    {
            x: 1,
            y: 1,
            width: 128,
            height: 128
	    }
    ],
    sequences: [
    	{
	        name: 'idle',
	        start: 1,
	        count: 1
	    }
    ]

});