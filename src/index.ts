import {StringTokenizer} from "./utils/StringTokenizer";

const inputStr = "concat hello (add 10 30) 'there you are'";

const tokens = new StringTokenizer(inputStr, " ");

while (tokens.hasMoreTokens()) {
    console.log(tokens.nextToken());
}