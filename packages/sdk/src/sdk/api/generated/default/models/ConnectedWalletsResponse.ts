/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
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

import { exists, mapValues } from '../runtime';
import type { ConnectedWallets } from './ConnectedWallets';
import {
    ConnectedWalletsFromJSON,
    ConnectedWalletsFromJSONTyped,
    ConnectedWalletsToJSON,
} from './ConnectedWallets';

/**
 * 
 * @export
 * @interface ConnectedWalletsResponse
 */
export interface ConnectedWalletsResponse {
    /**
     * 
     * @type {ConnectedWallets}
     * @memberof ConnectedWalletsResponse
     */
    data?: ConnectedWallets;
}

/**
 * Check if a given object implements the ConnectedWalletsResponse interface.
 */
export function instanceOfConnectedWalletsResponse(value: object): value is ConnectedWalletsResponse {
    let isInstance = true;

    return isInstance;
}

export function ConnectedWalletsResponseFromJSON(json: any): ConnectedWalletsResponse {
    return ConnectedWalletsResponseFromJSONTyped(json, false);
}

export function ConnectedWalletsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConnectedWalletsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : ConnectedWalletsFromJSON(json['data']),
    };
}

export function ConnectedWalletsResponseToJSON(value?: ConnectedWalletsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ConnectedWalletsToJSON(value.data),
    };
}

