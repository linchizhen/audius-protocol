/* tslint:disable */
// @ts-nocheck
/* eslint-disable */
/**
 * API
 * Audius V1 API
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  AccessInfoResponse,
  StreamUrlResponse,
  TopListener,
  TrackCommentsResponse,
  TrackInspect,
  TrackResponse,
  TrackSearch,
  TracksResponse,
} from '../models';
import {
    AccessInfoResponseFromJSON,
    AccessInfoResponseToJSON,
    StreamUrlResponseFromJSON,
    StreamUrlResponseToJSON,
    TopListenerFromJSON,
    TopListenerToJSON,
    TrackCommentsResponseFromJSON,
    TrackCommentsResponseToJSON,
    TrackInspectFromJSON,
    TrackInspectToJSON,
    TrackResponseFromJSON,
    TrackResponseToJSON,
    TrackSearchFromJSON,
    TrackSearchToJSON,
    TracksResponseFromJSON,
    TracksResponseToJSON,
} from '../models';

export interface DownloadTrackRequest {
    trackId: string;
    userId?: string;
    userSignature?: string;
    userData?: string;
    nftAccessSignature?: string;
    original?: boolean;
    filename?: string;
}

export interface GetBulkTracksRequest {
    permalink?: Array<string>;
    id?: Array<string>;
}

export interface GetTrackRequest {
    trackId: string;
}

export interface GetTrackAccessInfoRequest {
    trackId: string;
    userId?: string;
    includeNetworkCut?: boolean;
}

export interface GetTrackTopListenersRequest {
    trackId: string;
    offset?: number;
    limit?: number;
    userId?: string;
}

export interface GetTrendingTracksRequest {
    genre?: string;
    time?: GetTrendingTracksTimeEnum;
}

export interface GetUndergroundTrendingTracksRequest {
    offset?: number;
    limit?: number;
}

export interface InspectTrackRequest {
    trackId: string;
    original?: boolean;
}

export interface SearchTracksRequest {
    query?: string;
    genre?: Array<string>;
    sortMethod?: SearchTracksSortMethodEnum;
    mood?: Array<string>;
    onlyDownloadable?: string;
    includePurchaseable?: string;
    isPurchaseable?: string;
    hasDownloads?: string;
    key?: Array<string>;
    bpmMin?: string;
    bpmMax?: string;
}

export interface StreamTrackRequest {
    trackId: string;
    userId?: string;
    preview?: boolean;
    userSignature?: string;
    userData?: string;
    nftAccessSignature?: string;
    skipPlayCount?: boolean;
    apiKey?: string;
    skipCheck?: boolean;
    noRedirect?: boolean;
}

export interface TrackCommentsRequest {
    trackId: string;
    offset?: number;
    limit?: number;
}

/**
 * 
 */
export class TracksApi extends runtime.BaseAPI {

    /**
     * @hidden
     * Download an original or mp3 track
     * Download the original or MP3 file of a track
     */
    async downloadTrackRaw(params: DownloadTrackRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (params.trackId === null || params.trackId === undefined) {
            throw new runtime.RequiredError('trackId','Required parameter params.trackId was null or undefined when calling downloadTrack.');
        }

        const queryParameters: any = {};

        if (params.userId !== undefined) {
            queryParameters['user_id'] = params.userId;
        }

        if (params.userSignature !== undefined) {
            queryParameters['user_signature'] = params.userSignature;
        }

        if (params.userData !== undefined) {
            queryParameters['user_data'] = params.userData;
        }

        if (params.nftAccessSignature !== undefined) {
            queryParameters['nft_access_signature'] = params.nftAccessSignature;
        }

        if (params.original !== undefined) {
            queryParameters['original'] = params.original;
        }

        if (params.filename !== undefined) {
            queryParameters['filename'] = params.filename;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tracks/{track_id}/download`.replace(`{${"track_id"}}`, encodeURIComponent(String(params.trackId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Download an original or mp3 track
     * Download the original or MP3 file of a track
     */
    async downloadTrack(params: DownloadTrackRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.downloadTrackRaw(params, initOverrides);
    }

    /**
     * @hidden
     * Gets a list of tracks using their IDs or permalinks
     */
    async getBulkTracksRaw(params: GetBulkTracksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TracksResponse>> {
        const queryParameters: any = {};

        if (params.permalink) {
            queryParameters['permalink'] = params.permalink;
        }

        if (params.id) {
            queryParameters['id'] = params.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tracks`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TracksResponseFromJSON(jsonValue));
    }

    /**
     * Gets a list of tracks using their IDs or permalinks
     */
    async getBulkTracks(params: GetBulkTracksRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TracksResponse> {
        const response = await this.getBulkTracksRaw(params, initOverrides);
        return await response.value();
    }

    /**
     * @hidden
     * Gets a track by ID
     */
    async getTrackRaw(params: GetTrackRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TrackResponse>> {
        if (params.trackId === null || params.trackId === undefined) {
            throw new runtime.RequiredError('trackId','Required parameter params.trackId was null or undefined when calling getTrack.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tracks/{track_id}`.replace(`{${"track_id"}}`, encodeURIComponent(String(params.trackId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackResponseFromJSON(jsonValue));
    }

    /**
     * Gets a track by ID
     */
    async getTrack(params: GetTrackRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TrackResponse> {
        const response = await this.getTrackRaw(params, initOverrides);
        return await response.value();
    }

    /**
     * @hidden
     * Gets the information necessary to access the track and what access the given user has.
     */
    async getTrackAccessInfoRaw(params: GetTrackAccessInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccessInfoResponse>> {
        if (params.trackId === null || params.trackId === undefined) {
            throw new runtime.RequiredError('trackId','Required parameter params.trackId was null or undefined when calling getTrackAccessInfo.');
        }

        const queryParameters: any = {};

        if (params.userId !== undefined) {
            queryParameters['user_id'] = params.userId;
        }

        if (params.includeNetworkCut !== undefined) {
            queryParameters['include_network_cut'] = params.includeNetworkCut;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tracks/{track_id}/access-info`.replace(`{${"track_id"}}`, encodeURIComponent(String(params.trackId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AccessInfoResponseFromJSON(jsonValue));
    }

    /**
     * Gets the information necessary to access the track and what access the given user has.
     */
    async getTrackAccessInfo(params: GetTrackAccessInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccessInfoResponse> {
        const response = await this.getTrackAccessInfoRaw(params, initOverrides);
        return await response.value();
    }

    /**
     * @hidden
     * Get the users that have listened to a track the most
     */
    async getTrackTopListenersRaw(params: GetTrackTopListenersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TopListener>> {
        if (params.trackId === null || params.trackId === undefined) {
            throw new runtime.RequiredError('trackId','Required parameter params.trackId was null or undefined when calling getTrackTopListeners.');
        }

        const queryParameters: any = {};

        if (params.offset !== undefined) {
            queryParameters['offset'] = params.offset;
        }

        if (params.limit !== undefined) {
            queryParameters['limit'] = params.limit;
        }

        if (params.userId !== undefined) {
            queryParameters['user_id'] = params.userId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tracks/{track_id}/top_listeners`.replace(`{${"track_id"}}`, encodeURIComponent(String(params.trackId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TopListenerFromJSON(jsonValue));
    }

    /**
     * Get the users that have listened to a track the most
     */
    async getTrackTopListeners(params: GetTrackTopListenersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TopListener> {
        const response = await this.getTrackTopListenersRaw(params, initOverrides);
        return await response.value();
    }

    /**
     * @hidden
     * Gets the top 100 trending (most popular) tracks on Audius
     */
    async getTrendingTracksRaw(params: GetTrendingTracksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TracksResponse>> {
        const queryParameters: any = {};

        if (params.genre !== undefined) {
            queryParameters['genre'] = params.genre;
        }

        if (params.time !== undefined) {
            queryParameters['time'] = params.time;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tracks/trending`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TracksResponseFromJSON(jsonValue));
    }

    /**
     * Gets the top 100 trending (most popular) tracks on Audius
     */
    async getTrendingTracks(params: GetTrendingTracksRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TracksResponse> {
        const response = await this.getTrendingTracksRaw(params, initOverrides);
        return await response.value();
    }

    /**
     * @hidden
     * Gets the top 100 trending underground tracks on Audius
     */
    async getUndergroundTrendingTracksRaw(params: GetUndergroundTrendingTracksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TracksResponse>> {
        const queryParameters: any = {};

        if (params.offset !== undefined) {
            queryParameters['offset'] = params.offset;
        }

        if (params.limit !== undefined) {
            queryParameters['limit'] = params.limit;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tracks/trending/underground`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TracksResponseFromJSON(jsonValue));
    }

    /**
     * Gets the top 100 trending underground tracks on Audius
     */
    async getUndergroundTrendingTracks(params: GetUndergroundTrendingTracksRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TracksResponse> {
        const response = await this.getUndergroundTrendingTracksRaw(params, initOverrides);
        return await response.value();
    }

    /**
     * @hidden
     * Inspect a track
     * Inspects the details of the file for a track
     */
    async inspectTrackRaw(params: InspectTrackRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TrackInspect>> {
        if (params.trackId === null || params.trackId === undefined) {
            throw new runtime.RequiredError('trackId','Required parameter params.trackId was null or undefined when calling inspectTrack.');
        }

        const queryParameters: any = {};

        if (params.original !== undefined) {
            queryParameters['original'] = params.original;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tracks/{track_id}/inspect`.replace(`{${"track_id"}}`, encodeURIComponent(String(params.trackId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackInspectFromJSON(jsonValue));
    }

    /**
     * Inspect a track
     * Inspects the details of the file for a track
     */
    async inspectTrack(params: InspectTrackRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TrackInspect> {
        const response = await this.inspectTrackRaw(params, initOverrides);
        return await response.value();
    }

    /**
     * @hidden
     * Search for a track or tracks
     */
    async searchTracksRaw(params: SearchTracksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TrackSearch>> {
        const queryParameters: any = {};

        if (params.query !== undefined) {
            queryParameters['query'] = params.query;
        }

        if (params.genre) {
            queryParameters['genre'] = params.genre;
        }

        if (params.sortMethod !== undefined) {
            queryParameters['sort_method'] = params.sortMethod;
        }

        if (params.mood) {
            queryParameters['mood'] = params.mood;
        }

        if (params.onlyDownloadable !== undefined) {
            queryParameters['only_downloadable'] = params.onlyDownloadable;
        }

        if (params.includePurchaseable !== undefined) {
            queryParameters['includePurchaseable'] = params.includePurchaseable;
        }

        if (params.isPurchaseable !== undefined) {
            queryParameters['is_purchaseable'] = params.isPurchaseable;
        }

        if (params.hasDownloads !== undefined) {
            queryParameters['has_downloads'] = params.hasDownloads;
        }

        if (params.key) {
            queryParameters['key'] = params.key;
        }

        if (params.bpmMin !== undefined) {
            queryParameters['bpm_min'] = params.bpmMin;
        }

        if (params.bpmMax !== undefined) {
            queryParameters['bpm_max'] = params.bpmMax;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tracks/search`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackSearchFromJSON(jsonValue));
    }

    /**
     * Search for a track or tracks
     */
    async searchTracks(params: SearchTracksRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TrackSearch> {
        const response = await this.searchTracksRaw(params, initOverrides);
        return await response.value();
    }

    /**
     * @hidden
     * Stream an mp3 track This endpoint accepts the Range header for streaming. https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests
     * Get the streamable MP3 file of a track
     */
    async streamTrackRaw(params: StreamTrackRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamUrlResponse>> {
        if (params.trackId === null || params.trackId === undefined) {
            throw new runtime.RequiredError('trackId','Required parameter params.trackId was null or undefined when calling streamTrack.');
        }

        const queryParameters: any = {};

        if (params.userId !== undefined) {
            queryParameters['user_id'] = params.userId;
        }

        if (params.preview !== undefined) {
            queryParameters['preview'] = params.preview;
        }

        if (params.userSignature !== undefined) {
            queryParameters['user_signature'] = params.userSignature;
        }

        if (params.userData !== undefined) {
            queryParameters['user_data'] = params.userData;
        }

        if (params.nftAccessSignature !== undefined) {
            queryParameters['nft_access_signature'] = params.nftAccessSignature;
        }

        if (params.skipPlayCount !== undefined) {
            queryParameters['skip_play_count'] = params.skipPlayCount;
        }

        if (params.apiKey !== undefined) {
            queryParameters['api_key'] = params.apiKey;
        }

        if (params.skipCheck !== undefined) {
            queryParameters['skip_check'] = params.skipCheck;
        }

        if (params.noRedirect !== undefined) {
            queryParameters['no_redirect'] = params.noRedirect;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tracks/{track_id}/stream`.replace(`{${"track_id"}}`, encodeURIComponent(String(params.trackId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamUrlResponseFromJSON(jsonValue));
    }

    /**
     * Stream an mp3 track This endpoint accepts the Range header for streaming. https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests
     * Get the streamable MP3 file of a track
     */
    async streamTrack(params: StreamTrackRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamUrlResponse> {
        const response = await this.streamTrackRaw(params, initOverrides);
        return await response.value();
    }

    /**
     * @hidden
     * Get a list of comments for a track
     */
    async trackCommentsRaw(params: TrackCommentsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TrackCommentsResponse>> {
        if (params.trackId === null || params.trackId === undefined) {
            throw new runtime.RequiredError('trackId','Required parameter params.trackId was null or undefined when calling trackComments.');
        }

        const queryParameters: any = {};

        if (params.offset !== undefined) {
            queryParameters['offset'] = params.offset;
        }

        if (params.limit !== undefined) {
            queryParameters['limit'] = params.limit;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tracks/{track_id}/comments`.replace(`{${"track_id"}}`, encodeURIComponent(String(params.trackId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackCommentsResponseFromJSON(jsonValue));
    }

    /**
     * Get a list of comments for a track
     */
    async trackComments(params: TrackCommentsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TrackCommentsResponse> {
        const response = await this.trackCommentsRaw(params, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const GetTrendingTracksTimeEnum = {
    Week: 'week',
    Month: 'month',
    Year: 'year',
    AllTime: 'allTime'
} as const;
export type GetTrendingTracksTimeEnum = typeof GetTrendingTracksTimeEnum[keyof typeof GetTrendingTracksTimeEnum];
/**
 * @export
 */
export const SearchTracksSortMethodEnum = {
    Relevant: 'relevant',
    Popular: 'popular',
    Recent: 'recent'
} as const;
export type SearchTracksSortMethodEnum = typeof SearchTracksSortMethodEnum[keyof typeof SearchTracksSortMethodEnum];
