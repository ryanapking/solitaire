import CA from "../images/ace_of_clubs.png"
import C2 from "../images/2_of_clubs.png"
import C3 from "../images/3_of_clubs.png"
import C4 from "../images/4_of_clubs.png"
import C5 from "../images/5_of_clubs.png"
import C6 from "../images/6_of_clubs.png"
import C7 from "../images/7_of_clubs.png"
import C8 from "../images/8_of_clubs.png"
import C9 from "../images/9_of_clubs.png"
import C10 from "../images/10_of_clubs.png"
import CJ from "../images/jack_of_clubs.png"
import CQ from "../images/queen_of_clubs.png"
import CK from "../images/king_of_clubs.png"

import SA from "../images/ace_of_spades.png"
import S2 from "../images/2_of_spades.png"
import S3 from "../images/3_of_spades.png"
import S4 from "../images/4_of_spades.png"
import S5 from "../images/5_of_spades.png"
import S6 from "../images/6_of_spades.png"
import S7 from "../images/7_of_spades.png"
import S8 from "../images/8_of_spades.png"
import S9 from "../images/9_of_spades.png"
import S10 from "../images/10_of_spades.png"
import SJ from "../images/jack_of_spades.png"
import SQ from "../images/queen_of_spades.png"
import SK from "../images/king_of_spades.png"

import HA from "../images/ace_of_hearts.png"
import H2 from "../images/2_of_hearts.png"
import H3 from "../images/3_of_hearts.png"
import H4 from "../images/4_of_hearts.png"
import H5 from "../images/5_of_hearts.png"
import H6 from "../images/6_of_hearts.png"
import H7 from "../images/7_of_hearts.png"
import H8 from "../images/8_of_hearts.png"
import H9 from "../images/9_of_hearts.png"
import H10 from "../images/10_of_hearts.png"
import HJ from "../images/jack_of_hearts.png"
import HQ from "../images/queen_of_hearts.png"
import HK from "../images/king_of_hearts.png"

import DA from "../images/ace_of_diamonds.png"
import D2 from "../images/2_of_diamonds.png"
import D3 from "../images/3_of_diamonds.png"
import D4 from "../images/4_of_diamonds.png"
import D5 from "../images/5_of_diamonds.png"
import D6 from "../images/6_of_diamonds.png"
import D7 from "../images/7_of_diamonds.png"
import D8 from "../images/8_of_diamonds.png"
import D9 from "../images/9_of_diamonds.png"
import D10 from "../images/10_of_diamonds.png"
import DJ from "../images/jack_of_diamonds.png"
import DQ from "../images/queen_of_diamonds.png"
import DK from "../images/king_of_diamonds.png"

class Card {
  constructor(suit, value, image, color) {
    this.suit = suit;
    this.value = value;
    this.image = image;
    this.color = color;
  }
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const cards = [
  new Card("club", 1, CA, "black"),
  new Card("club", 2, C2, "black"),
  new Card("club", 3, C3, "black"),
  new Card("club", 4, C4, "black"),
  new Card("club", 5, C5, "black"),
  new Card("club", 6, C6, "black"),
  new Card("club", 7, C7, "black"),
  new Card("club", 8, C8, "black"),
  new Card("club", 9, C9, "black"),
  new Card("club", 10, C10, "black"),
  new Card("club", 11, CJ, "black"),
  new Card("club", 12, CQ, "black"),
  new Card("club", 13, CK, "black"),

  new Card("spade", 1, SA, "black"),
  new Card("spade", 2, S2, "black"),
  new Card("spade", 3, S3, "black"),
  new Card("spade", 4, S4, "black"),
  new Card("spade", 5, S5, "black"),
  new Card("spade", 6, S6, "black"),
  new Card("spade", 7, S7, "black"),
  new Card("spade", 8, S8, "black"),
  new Card("spade", 9, S9, "black"),
  new Card("spade", 10, S10, "black"),
  new Card("spade", 11, SJ, "black"),
  new Card("spade", 12, SQ, "black"),
  new Card("spade", 13, SK, "black"),

  new Card("heart", 1, HA, "red"),
  new Card("heart", 2, H2, "red"),
  new Card("heart", 3, H3, "red"),
  new Card("heart", 4, H4, "red"),
  new Card("heart", 5, H5, "red"),
  new Card("heart", 6, H6, "red"),
  new Card("heart", 7, H7, "red"),
  new Card("heart", 8, H8, "red"),
  new Card("heart", 9, H9, "red"),
  new Card("heart", 10, H10, "red"),
  new Card("heart", 11, HJ, "red"),
  new Card("heart", 12, HQ, "red"),
  new Card("heart", 13, HK, "red"),

  new Card("diamond", 1, DA, "red"),
  new Card("diamond", 2, D2, "red"),
  new Card("diamond", 3, D3, "red"),
  new Card("diamond", 4, D4, "red"),
  new Card("diamond", 5, D5, "red"),
  new Card("diamond", 6, D6, "red"),
  new Card("diamond", 7, D7, "red"),
  new Card("diamond", 8, D8, "red"),
  new Card("diamond", 9, D9, "red"),
  new Card("diamond", 10, D10, "red"),
  new Card("diamond", 11, DJ, "red"),
  new Card("diamond", 12, DQ, "red"),
  new Card("diamond", 13, DK, "red")
]

export default shuffle(cards);
