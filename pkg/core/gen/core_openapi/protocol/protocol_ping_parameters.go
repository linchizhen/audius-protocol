// Code generated by go-swagger; DO NOT EDIT.

package protocol

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"
	"net/http"
	"time"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	cr "github.com/go-openapi/runtime/client"
	"github.com/go-openapi/strfmt"
)

// NewProtocolPingParams creates a new ProtocolPingParams object,
// with the default timeout for this client.
//
// Default values are not hydrated, since defaults are normally applied by the API server side.
//
// To enforce default values in parameter, use SetDefaults or WithDefaults.
func NewProtocolPingParams() *ProtocolPingParams {
	return &ProtocolPingParams{
		timeout: cr.DefaultTimeout,
	}
}

// NewProtocolPingParamsWithTimeout creates a new ProtocolPingParams object
// with the ability to set a timeout on a request.
func NewProtocolPingParamsWithTimeout(timeout time.Duration) *ProtocolPingParams {
	return &ProtocolPingParams{
		timeout: timeout,
	}
}

// NewProtocolPingParamsWithContext creates a new ProtocolPingParams object
// with the ability to set a context for a request.
func NewProtocolPingParamsWithContext(ctx context.Context) *ProtocolPingParams {
	return &ProtocolPingParams{
		Context: ctx,
	}
}

// NewProtocolPingParamsWithHTTPClient creates a new ProtocolPingParams object
// with the ability to set a custom HTTPClient for a request.
func NewProtocolPingParamsWithHTTPClient(client *http.Client) *ProtocolPingParams {
	return &ProtocolPingParams{
		HTTPClient: client,
	}
}

/*
ProtocolPingParams contains all the parameters to send to the API endpoint

	for the protocol ping operation.

	Typically these are written to a http.Request.
*/
type ProtocolPingParams struct {
	timeout    time.Duration
	Context    context.Context
	HTTPClient *http.Client
}

// WithDefaults hydrates default values in the protocol ping params (not the query body).
//
// All values with no default are reset to their zero value.
func (o *ProtocolPingParams) WithDefaults() *ProtocolPingParams {
	o.SetDefaults()
	return o
}

// SetDefaults hydrates default values in the protocol ping params (not the query body).
//
// All values with no default are reset to their zero value.
func (o *ProtocolPingParams) SetDefaults() {
	// no default values defined for this parameter
}

// WithTimeout adds the timeout to the protocol ping params
func (o *ProtocolPingParams) WithTimeout(timeout time.Duration) *ProtocolPingParams {
	o.SetTimeout(timeout)
	return o
}

// SetTimeout adds the timeout to the protocol ping params
func (o *ProtocolPingParams) SetTimeout(timeout time.Duration) {
	o.timeout = timeout
}

// WithContext adds the context to the protocol ping params
func (o *ProtocolPingParams) WithContext(ctx context.Context) *ProtocolPingParams {
	o.SetContext(ctx)
	return o
}

// SetContext adds the context to the protocol ping params
func (o *ProtocolPingParams) SetContext(ctx context.Context) {
	o.Context = ctx
}

// WithHTTPClient adds the HTTPClient to the protocol ping params
func (o *ProtocolPingParams) WithHTTPClient(client *http.Client) *ProtocolPingParams {
	o.SetHTTPClient(client)
	return o
}

// SetHTTPClient adds the HTTPClient to the protocol ping params
func (o *ProtocolPingParams) SetHTTPClient(client *http.Client) {
	o.HTTPClient = client
}

// WriteToRequest writes these params to a swagger request
func (o *ProtocolPingParams) WriteToRequest(r runtime.ClientRequest, reg strfmt.Registry) error {

	if err := r.SetTimeout(o.timeout); err != nil {
		return err
	}
	var res []error

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}
