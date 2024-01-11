export class InstagramInsightsDto {
    period?: {
        since: number;
        until: number;
    };
    userId: string;
    id:string;
    locale?: string;
  };