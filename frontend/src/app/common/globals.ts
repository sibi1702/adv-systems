export class Globals {
    public static apiBaseUrl: string = "http://localhost:3000/api/";
    public static siteBaseUrl: string = "http://localhost:4200/";

    public randomString = (length: any, chars: string | any[]) => {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
}
