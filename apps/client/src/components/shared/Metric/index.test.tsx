import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Metric } from '.'

describe('AccountsList', () => {
  it('Should display negative trend', () => {
    render(
      <Metric
        title="Likes"
        value={13}
        diff={-0.3}
        hint="Hint"
      />
    );

    expect(screen.getByText('-30.00%')).toBeInTheDocument()
  });

  it('Should display positive trend', () => {
    render(
      <Metric
        title="Likes"
        value={13}
        diff={0.3}
        hint="Hint"
      />
    );

    expect(screen.getByText('+30.00%')).toBeInTheDocument()
  });

  it('Should not display zero trend', () => {
    render(
      <Metric
        title="Likes"
        value={13}
        diff={0}
        hint="Hint"
      />
    );

    expect(screen.queryByText('0%')).toBeNull()
  });
})