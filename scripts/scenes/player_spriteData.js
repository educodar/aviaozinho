
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

// SpriteData.add('player_sprite_data', {
// 	file: 'images/bunny.png',
// 	frames: [
// 	    {
//             x: 1,
//             y: 1,
//             width: 70,
//             height: 60
// 	    },
// 	    {
//             x: 71,
//             y: 1,
//             width: 70,
//             height: 60
// 	    }
//     ],
//     sequences: [
//     	{
// 	        name: 'idle',
// 	        start: 1,
// 	        count: 1
// 	    },
// 	    {
// 	        name: 'walking',
// 	        start: 1,
// 	        count: 2
// 	    }
//     ]

// });