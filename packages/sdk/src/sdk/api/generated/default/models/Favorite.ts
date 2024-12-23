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
/**
 * 
 * @export
 * @interface Favorite
 */
export interface Favorite {
    /**
     * 
     * @type {string}
     * @memberof Favorite
     */
    favoriteItemId: string;
    /**
     * 
     * @type {string}
     * @memberof Favorite
     */
    favoriteType: string;
    /**
     * 
     * @type {string}
     * @memberof Favorite
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof Favorite
     */
    createdAt: string;
}

/**
 * Check if a given object implements the Favorite interface.
 */
export function instanceOfFavorite(value: object): value is Favorite {
    let isInstance = true;
    isInstance = isInstance && "favoriteItemId" in value && value["favoriteItemId"] !== undefined;
    isInstance = isInstance && "favoriteType" in value && value["favoriteType"] !== undefined;
    isInstance = isInstance && "userId" in value && value["userId"] !== undefined;
    isInstance = isInstance && "createdAt" in value && value["createdAt"] !== undefined;

    return isInstance;
}

export function FavoriteFromJSON(json: any): Favorite {
    return FavoriteFromJSONTyped(json, false);
}

export function FavoriteFromJSONTyped(json: any, ignoreDiscriminator: boolean): Favorite {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'favoriteItemId': json['favorite_item_id'],
        'favoriteType': json['favorite_type'],
        'userId': json['user_id'],
        'createdAt': json['created_at'],
    };
}

export function FavoriteToJSON(value?: Favorite | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'favorite_item_id': value.favoriteItemId,
        'favorite_type': value.favoriteType,
        'user_id': value.userId,
        'created_at': value.createdAt,
    };
}

