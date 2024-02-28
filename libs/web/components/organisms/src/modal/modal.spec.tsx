import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from './modal';

describe('Modal',()=> {
    it('renders correctly when isOpen is true', () => {
        const mockOnClose = jest.fn();
        const props = {
            isOpen: true,
            title: "Test Modal",
            onClose: mockOnClose,
            width: "400",
            height: "300",
          };
        const { baseElement } = render(<Modal {...props}>Modal Content</Modal>);
        expect(baseElement).toBeTruthy();
        fireEvent.click(screen.getByTestId("close-button"));
        expect(mockOnClose).toHaveBeenCalled();
    })

    it("does not render when isOpen is false", () => {
        const props = {
          isOpen: false,
          title: "Test Modal",
          onClose: jest.fn(),
          width: "400",
          height: "300",
        };
        render(<Modal {...props}>Modal Content</Modal>);
    })
})