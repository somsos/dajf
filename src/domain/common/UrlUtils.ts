export class UrlUtils {
  static doesItHaveParams(url: string): { start: number; end: number } | null {
    // Regular expression to match a number in the path (e.g., "/123")
    const dynamicSegmentRegex = /\/\d+/;

    // Execute the regex on the URL and get the match
    const match = url.match(dynamicSegmentRegex);

    // If there's a match, return the start and end indices
    if (match) {
      const startIndex = match.index!;
      const endIndex = startIndex + match[0].length - 1;
      return { start: startIndex, end: endIndex };
    }

    // If no match is found, return null
    return null;
  }

  static reduceParams(url: string): string {
    let queryStarter = url.indexOf('?');
    if (queryStarter == -1) {
      queryStarter = url.length;
    }

    const noQueryParams = url.substring(0, queryStarter);
    const reduced = noQueryParams.replace(/\/\d+/g, '/1');
    const resp = reduced + url.substring(queryStarter, url.length);
    return resp;
  }
}
