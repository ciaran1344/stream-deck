# Echo

**⚠️ This application is still work-in-progress. ⚠️**

Echo is a simple sequence memory game for the Elgato [Stream Deck](https://www.elgato.com/uk/en/s/welcome-to-stream-deck).

## Rules

Echo can be played with any number of Stream Deck keys.

By default, the Echo key shows your **high score**; the highest number of rounds achieved for the selected [difficulty](#difficulties).

The game starts with a **five key** sequence.
This increases every three rounds.

You must successfully **repeat** the sequence.
Keep playing until you make a mistake!
If the wrong key is pressed, the game ends.

## Difficulties

Echo has several difficulty levels, with varying [Difficulty Modifiers](#difficulty-modifiers):

| Difficulty       | Speed | Multi | Colours  |
| ---------------- | ----- | ----- | -------- |
| Easy             | 0.5   | 1     | Enabled  |
| Normal (default) | 1.0   | 1     | Enabled  |
| Hard             | 1.5   | 2     | Enabled  |
| Extreme          | 2.0   | 3     | Disabled |
| Custom           | -     | -     | -        |

### Difficulty Modifiers

The following properties can be modified via the [Property Inspector](https://docs.elgato.com/sdk/plugins/terminology) to make the game more or less
difficult!

| Name    | Description                              |
| ------- | ---------------------------------------- |
| Speed   | How quickly the sequence plays!          |
| Multi   | Maximum number of keys to light at once. |
| Colours | Light up each key in a separate colour.  |

### Tasks

- [ ] Game should return to home screen if no input in X seconds
